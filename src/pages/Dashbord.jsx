import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_URL, deleteJob } from "../services/api";
import Modal from "../components/Modal";
import { Loader, ErrorMessage } from "../components/Status";
import { formatSalary } from "../utils/format";
import { cardClass, primaryButton, secondaryButton } from "../utils/styles";

function Dashboard() {
  const { data, loading, error, reload } = useFetch(`${API_URL}/jobs`);
  const jobs = data ?? [];

  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const closeModal = useCallback(() => setJobToDelete(null), []);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteJob(jobToDelete.id);
      setJobToDelete(null);
      reload();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Recruiter dashboard</h1>
        <Link to="/dashboard/new" className={primaryButton}>
          + Post new job
        </Link>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className={`${cardClass} overflow-x-auto`}>
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Company</th>
                <th className="p-4">Location</th>
                <th className="p-4">Salary</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No jobs posted yet
                  </td>
                </tr>
              )}
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-gray-100 last:border-0 dark:border-gray-700"
                >
                  <td className="p-4 font-medium">{job.title}</td>
                  <td className="p-4">{job.company}</td>
                  <td className="p-4">{job.location}</td>
                  <td className="p-4">{formatSalary(job.salary)}</td>
                  <td className="flex gap-2 p-4">
                    <Link
                      to={`/dashboard/edit/${job.id}`}
                      className={secondaryButton}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setJobToDelete(job)}
                      className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={Boolean(jobToDelete)} title="Delete job?" onClose={closeModal}>
        <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete "{jobToDelete?.title}"? This cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={closeModal} className={secondaryButton}>
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;