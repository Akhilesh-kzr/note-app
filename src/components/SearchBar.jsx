function SearchBar({ search, setSearch }) {

  return (
    <div className="mb-6">

      <input
        type="text"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={function (e) {
          setSearch(e.target.value);
        }}
        className="w-full max-w-xl mx-auto block border rounded-full px-5 py-3 bg-white shadow-sm outline-none"
      />

    </div>
  );
}

export default SearchBar;