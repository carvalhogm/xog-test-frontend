import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../App";
import ReactMarkdown from "react-markdown";
import { NoteStyle } from "./styles";
import { deleteNote, updateNote } from "../../services/api";
import dayjs from "dayjs";

let x = 0,
  y = 0;
let timeoutHandler = null;

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export default ({ _id, content, position, createdAt }) => {
  const { state, setState: setGlobalState } = useContext(AppContext);

  const noteRef = useRef(null);
  const textAreaRef = useRef(null);

  const [isLoading, setSpinner] = useState(false);
  const [isEditing, setEditingNote] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(content || "");

  useEffect(() => {
    if (isEditing) textAreaResize();
  }, [isEditing]);

  const mouseDownHandler = (event) => {
    x = event.clientX;
    y = event.clientY;

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = (event) => {
    const dx = event.clientX - x;
    const dy = event.clientY - y;

    noteRef.current.style.top = `${clamp(
      noteRef.current.offsetTop + dy,
      0,
      Infinity
    )}px`;

    noteRef.current.style.left = `${clamp(
      noteRef.current.offsetLeft + dx,
      0,
      Infinity
    )}px`;

    x = event.clientX;
    y = event.clientY;
  };

  const mouseUpHandler = async (event) => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);

    const x = Number(noteRef.current.style.left.replace("px", ""));
    const y = Number(noteRef.current.style.top.replace("px", ""));

    if (x !== position.x || y !== position.y) {
      updateNoteHandler(x, y, true);
    }
  };

  const updateNoteHandler = async (x, y, disableSpinner) => {
    if(!disableSpinner) setSpinner(true)

    const updatedValues = {
      _id,
      createdAt,
      position: {
        x: x || position.x,
        y: y || position.y,
      },
      content: textAreaValue,
    };

    const response = await updateNote(_id, updatedValues);

    if (response.updated) {
      const updatedNotes = state.notes.map((note) => {
        if (note._id === _id) {
          return {
            ...updatedValues,
          };
        }
        return note;
      });

      setGlobalState({
        notes: updatedNotes,
      });

      if(!disableSpinner) setSpinner(false)
    }
  };

  const textAreaEventHandler = (event) => {
    clearTimeout(timeoutHandler);
    timeoutHandler = setTimeout(() => {
      updateNoteHandler();
      setEditingNote(false);
    }, 3000);

    if(event) textAreaResize();
  };

  const textAreaResize = () => {
    textAreaRef.current.parentElement.style.height =
      textAreaRef.current.scrollHeight + "px";
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  const textAreaOnChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const deleteNoteHandler = async () => {
    const response = await deleteNote(_id);
    if (response.deleted) {
      setGlobalState({
        notes: state.notes.filter((note) => note._id !== _id),
      });
    }
  };

  return (
    <NoteStyle
      ref={noteRef}
      onMouseDown={mouseDownHandler}
      style={{ left: position.x, top: position.y }}
    >
      <div
        className="note-container"
        onClick={() => {
          if (!isEditing) setEditingNote(true);
          textAreaEventHandler()
        }}
      >
        {content && !isEditing ? (
          <ReactMarkdown>{textAreaValue}</ReactMarkdown>
        ) : (
          <textarea
            ref={textAreaRef}
            onKeyUp={textAreaEventHandler}
            onChange={textAreaOnChange}
            placeholder="Write something"
            value={textAreaValue}
          ></textarea>
        )}
      </div>
      <div className="note-options">
        <button type="button" onClick={deleteNoteHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="red"
              d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
            />
          </svg>
        </button>
        <p className="note-date">
          {dayjs(createdAt).format("HH:mm MM/DD/YYYY")}
        </p>
      </div>
      <div className={`spinner ${isLoading ? "active" : ""}`}>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    </NoteStyle>
  );
};
