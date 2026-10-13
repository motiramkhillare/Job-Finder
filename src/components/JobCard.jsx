function JobCard({ job }) {
  return (
    <article className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div>
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
            {job.type}
          </span>
        </div>

        <p className="text-sm font-medium text-gray-700">{job.company}</p>

        <div className="mt-3 space-y-1 text-sm text-gray-500">
          <p>📍 {job.location}</p>
          <p>💰 ₹{job.salary.toLocaleString("en-IN")} / year</p>
        </div>
      </div>

      <button className="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
        View
      </button>
    </article>
  );
}

export default JobCard;