import { useId } from "react";
import { inputClass } from "../utils/styles";

function SearchBar({ value, onChange }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Search jobs
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by job title or company..."
        className={`${inputClass} py-3`}
      />
    </div>
  );
}

export default SearchBar;