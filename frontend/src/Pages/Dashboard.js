import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotes, addNote, deleteNote } from "../api";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const data = await getNotes(token);
    setNotes(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addNote(token, title, content);
    setTitle("");
    setContent("");
    loadNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(token, id);
    loadNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>My Notes</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <form onSubmit={handleAdd} className="add-note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note.id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>

      {notes.length === 0 && <p className="no-notes">No notes yet. Add one above!</p>}
    </div>
  );
}

export default Dashboard;