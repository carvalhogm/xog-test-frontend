import React, { createContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import NoteCanvas from "./components/NoteCanvas";
import "./App.css";

const APP_DEFAULT_STATE = {
  state: {
    notes: []
  },
  setState: () => {},
};

export const AppContext = createContext(APP_DEFAULT_STATE);

function App() {
  const [state, setState] = useState(APP_DEFAULT_STATE.state);

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <div className="App">
        <NoteCanvas />
      </div>
    </AppContext.Provider>
  );
}

export default App;
