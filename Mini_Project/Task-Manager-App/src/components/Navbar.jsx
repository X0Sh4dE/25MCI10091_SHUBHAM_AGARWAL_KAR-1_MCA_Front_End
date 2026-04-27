export default function Navbar({ search, setSearch }) {
  return (
    <div className="bg-gray-800 p-4 rounded mb-4 flex justify-between">
      <h1 className="text-xl font-bold p-3">Task Manager</h1>
      <input
        placeholder="Search..."
        className="p-2 bg-gray-700 w-3xs rounded-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}