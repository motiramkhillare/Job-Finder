import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../services/api";
import { useSavedJobs } from "../context/SavedJobsContext";
import { Loader, ErrorMessage } from "../components/Status";
import { formatSalary } from "../utils/format";
import { cardClass, primaryButton, secondaryButton } from "../utils/styles";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, loading, error } = useFetch(`${API_URL}/jobs/${id}`);
  const { toggleSave, isSaved } = useSavedJobs();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message="Job not found or server is down." />;
  if (!job) return null;

  const saved = isSaved(job.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button onClick={() => navigate(-1)} className={secondaryButton}>
        ← Back
      </button>

      <div className={`${cardClass} space-y-4 p-6`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            {job.type}
          </span>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-300">
          <p>📍 {job.location}</p>
          <p>💰 {formatSalary(job.salary)} / year</p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">About this job</h2>
          <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
        </div>

        <div className="flex gap-3">
          <button className={primaryButton}>Apply now</button>
          <button onClick={() => toggleSave(job)} className={secondaryButton}>
            {saved ? "❤️ Saved" : "🤍 Save job"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;