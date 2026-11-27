import NoteCard from "./NoteCard";

function NoteList({
  notes,
  deleteNote,
  updateNote,
  togglePin,
  toggleArchive
}) {

  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">
          📝
        </div>

        <h2 className="text-xl font-semibold text-gray-600">
          No notes found
        </h2>

        <p className="text-gray-400 mt-2">
          Create your first note.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

      {notes.map(function (note) {

        return (
          <NoteCard
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            updateNote={updateNote}
            togglePin={togglePin}
          />
        );

      })}

    </div>
  );
}

export default NoteList;