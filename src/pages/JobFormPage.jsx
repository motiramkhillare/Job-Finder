import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_URL, createJob, updateJob } from "../services/api";
import { useAuth } from "../context/AuthContext";
import JobForm from "../components/JobForm";
import { Loader, ErrorMessage } from "../components/Status";
import { cardClass } from "../utils/styles";

function JobFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = Boolean(id);

  const { data: job, loading, error } = useFetch(
    isEdit ? `${API_URL}/jobs/${id}` : null
  );

  async function handleSubmit(values) {
    if (isEdit) {
      await updateJob(id, { ...job, ...values });
    } else {
      await createJob({ ...values, postedBy: user.id });
    }
    navigate("/dashboard");
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message="Job not found or server is down." />;

  return (
    <div className={`${cardClass} mx-auto max-w-2xl p-6`}>
      <h1 className="mb-6 text-2xl font-bold">
        {isEdit ? "Edit job" : "Post a new job"}
      </h1>
      <JobForm
        initialValues={job}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Save changes" : "Post job"}
      />
    </div>
  );
}

export default JobFormPage;