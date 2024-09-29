import React, { useState, useEffect } from "react";
import NoteList from "./components/NoteList";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const addNote = () => {
    const newNote = { id: Date.now(), text: inputValue };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setInputValue("");
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div>
      <h1>Quick Notes</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe tu nota"
      />
      <button onClick={addNote}>Agregar Nota</button>
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
};

export default App;
