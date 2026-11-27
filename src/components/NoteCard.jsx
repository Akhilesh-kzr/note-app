import { useState } from "react";

function NoteCard({
  note,
  deleteNote,
  updateNote,
  togglePin
}) {

  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // Note colors
  const noteColors = {
    yellow: "bg-yellow-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
    pink: "bg-pink-200",
    purple: "bg-purple-200"
  };

  function saveEdit() {

    if (!content.trim()) {
      alert("Content cannot be empty");
      return;
    }

    if (title.length > 100) {
      alert("Title cannot exceed 100 characters");
      return;
    }

    updateNote({
      ...note,
      title: title.trim(),
      content: content.trim(),
      updatedAt: new Date().toISOString()
    });

    setEditing(false);
  }

  function handleDelete() {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (confirmDelete) {
      deleteNote(note.id);
    }
  }

  // Edit mode
  if (editing) {

    return (
      <div className={`${noteColors[note.color]} rounded-lg shadow p-4`}>

        <input
          value={title}
          onChange={function (e) {
            setTitle(e.target.value);
          }}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          value={content}
          onChange={function (e) {
            setContent(e.target.value);
          }}
          className="w-full border p-2 rounded h-32"
        />

        <div className="flex gap-2 mt-3">

          <button
            onClick={saveEdit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={function () {
              setEditing(false);
            }}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>
    );
  }

  // Display mode
  return (
    <div className={`${noteColors[note.color]} rounded-lg shadow p-4`}>

      <div className="flex justify-between">

        <h2 className="font-bold text-lg">
          {note.title || "Untitled"}
        </h2>

        <button
          onClick={function () {
            togglePin(note.id);
          }}
        >
          {note.pinned ? "📌" : "📍"}
        </button>

      </div>

      <p className="text-gray-600 mt-3 whitespace-pre-wrap">
        {note.content}
      </p>

      <p className="text-xs text-gray-500 mt-4">
        Updated: {new Date(note.updatedAt).toLocaleString()}
      </p>

      <div className="flex gap-2 mt-4">

        <button
          onClick={function () {
            setEditing(true);
          }}
          className="bg-blue-100 px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-100 px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default NoteCard;