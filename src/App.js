import React, { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import "./App.css"; // Importa los estilos

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false); // Para manejar el modal
  const [selectedNote, setSelectedNote] = useState(null); // Para la nota seleccionada

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const addNote = () => {
    if (title.trim() === "" || content.trim() === "") {
      return;
    }
    const newNote = { id: Date.now(), title, content };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setTitle("");
    setContent("");
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setShowModal(false);
    setSelectedNote(null); // Resetear nota seleccionada al crear una nueva
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setSelectedNote(null); // Resetear nota seleccionada al eliminar
  };

  // Mostrar la nota seleccionada en un modal
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  // Abrir modal para crear una nueva nota
  const handleCreateNote = () => {
    setSelectedNote(null); // Asegúrate de que no haya una nota seleccionada
    setTitle("");
    setContent("");
    setShowModal(true);
  };

  return (
    <div className="app-container">
      <h1>Notas Rápidas</h1>
      {/* Botón que abre la ventana modal para agregar una nueva nota */}
      <button className="create-note-btn" onClick={handleCreateNote}>
        Crear Nota
      </button>

      {/* Modal de agregar/editar nota */}
      {showModal && selectedNote === null && (
        <div className="modal">
          <div className="sticky-note">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la nota"
              className="note-title-input"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe tu nota"
              className="note-content-textarea"
            />
            <button className="add-note-btn" onClick={addNote}>
              Guardar Nota
            </button>
            <button
              className="close-modal-btn"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para ver una nota existente */}
      {showModal && selectedNote !== null && (
        <div className="modal">
          <div className="sticky-note">
            <h3>{selectedNote.title}</h3>
            <p>{selectedNote.content}</p>
            <button
              className="close-modal-btn"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <NoteList
        notes={notes}
        onDelete={deleteNote}
        onNoteClick={handleNoteClick}
      />
    </div>
  );
};

export default App;
