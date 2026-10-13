import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ErrorMessage } from "../components/Status";
import { inputClass, primaryButton, cardClass } from "../utils/styles";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await register({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className={`${cardClass} mx-auto max-w-md space-y-4 p-6`}>
      <h1 className="text-2xl font-bold">Create account</h1>
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          className={inputClass}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="user">I am looking for a job</option>
          <option value="recruiter">I want to hire (recruiter)</option>
        </select>
        <button type="submit" disabled={submitting} className={`${primaryButton} w-full`}>
          {submitting ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;