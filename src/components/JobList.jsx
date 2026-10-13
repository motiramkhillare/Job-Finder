import { useMemo } from "react";
import JobCard from "./JobCard";
import { useSavedJobs } from "../context/SavedJobsContext";

function JobList({ jobs }) {
  const { saved, toggleSave } = useSavedJobs();
  const savedIds = useMemo(() => new Set(saved.map((j) => j.id)), [saved]);

  if (jobs.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-gray-300 py-16 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
        No jobs found
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedIds.has(job.id)}
          onToggleSave={toggleSave}
        />
      ))}
    </div>
  );
}

export default JobList;