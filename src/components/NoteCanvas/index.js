import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import Note from "../Note";
import { retrieveNotes, createNote } from "../../services/api";
import { NoteCanvasStyle, NoteAddButtonStyle } from "./styles";

export default () => {
  const { state, setState: setGlobalState } = useContext(AppContext);

  useEffect(async () => {
    const notes = await retrieveNotes();
    setGlobalState({
      notes
    })
  }, [])

  const noteAddHandler = async () => {
    const note = await createNote();
    setGlobalState({
      notes: [...state.notes, note]
    })
  };

  return (
    <NoteCanvasStyle>
      {
        state.notes.map(note => <Note key={note._id} {...{...note}} />)
      }
      <NoteAddButtonStyle onClick={noteAddHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
        </svg>
      </NoteAddButtonStyle>
    </NoteCanvasStyle>
  );
};
