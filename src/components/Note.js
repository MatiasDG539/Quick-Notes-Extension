import React from "react";

const Note = ({ note, onDelete }) => {
  return (
    <div>
      <p>{note.text}</p>
      <button onClick={() => onDelete(note.id)}>Eliminar</button>
    </div>
  );
};

export default Note;
