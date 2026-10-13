import { secondaryButton } from "../utils/styles";

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        className={secondaryButton}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            p === page
              ? "bg-indigo-600 text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        className={secondaryButton}
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;