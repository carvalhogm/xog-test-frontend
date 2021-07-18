import axios from "axios";

export const createNote = async () => {
  const response = await axios.post(`http://localhost:3030/notes`);

  if (response.data) {
    return response.data.note;
  }
  return null;
};

export const retrieveNotes = async () => {
  const response = await axios.get(`http://localhost:3030/notes`);

  if (response.data) {
    return response.data.notes;
  }
  return null;
};

export const updateNote = async (noteId, { position, content }) => {
  const response = await axios.put(
    `http://localhost:3030/notes/${noteId}`,
    {
      position,
      content,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await axios.delete(
    `http://localhost:3030/notes/${noteId}`
  );

  if(response.data) return response.data;

  return null
};
