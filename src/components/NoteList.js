import React from "react";
import Note from "./Note";

const NoteList = ({ notes, onDelete }) => {
  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteList;
