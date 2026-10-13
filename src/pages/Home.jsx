import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useDeferredValue,
} from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import { API_URL } from "../services/api";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import JobList from "../components/JobList";
import Pagination from "../components/Pagination";
import { Loader, ErrorMessage } from "../components/Status";

const PAGE_SIZE = 6;

function Home() {
  const { data, loading, error } = useFetch(`${API_URL}/jobs`);
  const jobs = useMemo(() => data ?? [], [data]);

  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const location = params.get("location") || "";
  const type = params.get("type") || "";
  const minSalary = Number(params.get("minSalary")) || 0;
  const page = Number(params.get("page")) || 1;

  const [text, setText] = useState(q);
  const debouncedText = useDebounce(text, 400);
  const deferredQ = useDeferredValue(q);

  const updateParams = useCallback(
    (changes, resetPage = true) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(changes).forEach(([key, value]) => {
            if (value) next.set(key, String(value));
            else next.delete(key);
          });
          if (resetPage) next.delete("page");
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  useEffect(() => {
    if (debouncedText !== q) {
      updateParams({ q: debouncedText });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location))].sort(),
    [jobs]
  );

  const filtered = useMemo(() => {
    const term = deferredQ.toLowerCase();
    return jobs.filter((job) => {
      const matchText =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term);
      const matchLocation = !location || job.location === location;
      const matchType = !type || job.type === type;
      const matchSalary = job.salary >= minSalary;
      return matchText && matchLocation && matchType && matchSalary;
    });
  }, [jobs, deferredQ, location, type, minSalary]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageJobs = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage]
  );

  function handleClear() {
    setText("");
    setParams({}, { replace: true });
  }

  function handlePageChange(newPage) {
    updateParams({ page: newPage }, false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Find your next job</h1>

      <SearchBar value={text} onChange={setText} />

      <Filters
        filters={{ location, type, minSalary }}
        locations={locations}
        onChange={(name, value) => updateParams({ [name]: value })}
        onClear={handleClear}
      />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} {filtered.length === 1 ? "job" : "jobs"} found
          </p>
          <JobList jobs={pageJobs} />
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default Home;