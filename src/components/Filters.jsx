import { useId } from "react";
import { inputClass, secondaryButton } from "../utils/styles";

const TYPES = ["Full-time", "Part-time", "Internship", "Contract"];
const SALARIES = [
  { label: "Any salary", value: 0 },
  { label: "₹3L+", value: 300000 },
  { label: "₹6L+", value: 600000 },
  { label: "₹10L+", value: 1000000 },
];

function Filters({ filters, locations, onChange, onClear }) {
  const id = useId();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label htmlFor={`${id}-location`} className="sr-only">
          Location
        </label>
        <select
          id={`${id}-location`}
          value={filters.location}
          onChange={(e) => onChange("location", e.target.value)}
          className={inputClass}
        >
          <option value="">All locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-type`} className="sr-only">
          Job type
        </label>
        <select
          id={`${id}-type`}
          value={filters.type}
          onChange={(e) => onChange("type", e.target.value)}
          className={inputClass}
        >
          <option value="">All types</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-salary`} className="sr-only">
          Minimum salary
        </label>
        <select
          id={`${id}-salary`}
          value={filters.minSalary}
          onChange={(e) => onChange("minSalary", e.target.value)}
          className={inputClass}
        >
          {SALARIES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={onClear} className={secondaryButton}>
        Clear filters
      </button>
    </div>
  );
}

export default Filters;