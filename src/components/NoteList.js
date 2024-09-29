import React from "react";

const NoteList = ({ notes, onDelete, onNoteClick }) => {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id} className="note-item">
          <div>
            <h3
              onClick={() => onNoteClick(note)} // Al hacer clic en el título, abrir la nota
              style={{ cursor: "pointer", color: "#007bff" }} // Estilo de enlace para el título
            >
              {note.title}
            </h3>
          </div>
          <button className="delete-button" onClick={() => onDelete(note.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
