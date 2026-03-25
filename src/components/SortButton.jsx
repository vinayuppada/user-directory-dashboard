export default function SortButton({ label, field, sortField, sortDir, onSort }) {
  const isActive = sortField === field;

  return (
    <button
      onClick={() => onSort(field)}
      className={`inline-flex items-center gap-1 font-semibold text-xs uppercase tracking-wider transition-colors select-none ${
        isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      {label}
      <span className="flex flex-col leading-none">
        <svg
          className={`w-2.5 h-2.5 ${isActive && sortDir === 'asc' ? 'text-blue-600' : 'text-gray-300'}`}
          viewBox="0 0 10 6"
          fill="currentColor"
        >
          <path d="M5 0L10 6H0L5 0z" />
        </svg>
        <svg
          className={`w-2.5 h-2.5 ${isActive && sortDir === 'desc' ? 'text-blue-600' : 'text-gray-300'}`}
          viewBox="0 0 10 6"
          fill="currentColor"
        >
          <path d="M5 6L0 0H10L5 6z" />
        </svg>
      </span>
    </button>
  );
}
