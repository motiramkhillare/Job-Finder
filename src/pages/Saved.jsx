import JobList from "../components/JobList";
import { useSavedJobs } from "../context/SavedJobsContext";

function Saved() {
  const { saved } = useSavedJobs();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Saved jobs</h1>
      <JobList jobs={saved} />
    </div>
  );
}

export default Saved;