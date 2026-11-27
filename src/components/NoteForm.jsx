import { useState } from "react";
import ColorPicker from "./ColorPicker";

function NoteForm({ notes, addNote }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("yellow");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Content validation
    if (!content.trim()) {
      setError("Content cannot be empty");
      return;
    }

    // Title validation
    if (title.length > 100) {
      setError("Title cannot exceed 100 characters");
      return;
    }

    // Duplicate validation
    const duplicate = notes.some(function (note) {
      return (
        note.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        note.content.trim().toLowerCase() === content.trim().toLowerCase()
      );
    });

    if (duplicate) {
      setError("This note already exists");
      return;
    }

    const newNote = {
  id: Date.now(),
  title: title.trim(),
  content: content.trim(),
  color: color,          // ⭐ important
  pinned: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
    addNote(newNote);

    // Clear form
    setTitle("");
    setContent("");
    setColor("yellow");
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 mb-6"
    >

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={function (e) {
          setTitle(e.target.value);
        }}
        className="w-full border-b p-2 mb-3 outline-none"
      />

      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={function (e) {
          setContent(e.target.value);
        }}
        className="w-full border p-3 rounded-md h-28 resize-none outline-none"
      />

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}

      <div className="flex justify-between items-center mt-4">

        <ColorPicker
          color={color}
          setColor={setColor}
        />

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-md font-medium"
        >
          Add Note
        </button>

      </div>

    </form>
  );
}

export default NoteForm;