import { useEffect, useState } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import SearchBar from "./components/SearchBar";
import NoteList from "./components/NoteList";



function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  // Load notes from localStorage
  useEffect(function () {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage
  useEffect(function () {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Create note
  function addNote(note) {
    setNotes(function (oldNotes) {
      return [...oldNotes, note];
    });
  }

  // Delete note
  function deleteNote(id) {
    setNotes(function (oldNotes) {
      return oldNotes.filter(function (note) {
        return note.id !== id;
      });
    });
  }

  // Update note
  function updateNote(updatedNote) {
    setNotes(function (oldNotes) {
      return oldNotes.map(function (note) {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }

        return note;
      });
    });
  }

  // Pin / unpin
  function togglePin(id) {
    setNotes(function (oldNotes) {
      return oldNotes.map(function (note) {
        if (note.id === id) {
          return {
            ...note,
            pinned: !note.pinned
          };
        }

        return note;
      });
    });
  }

  // Search
  const filteredNotes = notes.filter(function (note) {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto p-6">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <NoteForm
          notes={notes}
          addNote={addNote}
        />

        <NoteList
          notes={filteredNotes}
          deleteNote={deleteNote}
          updateNote={updateNote}
          togglePin={togglePin}
        />

      </main>
    </div>
  );
}

export default App;