import { useState, useEffect, useRef, useId } from "react";
import { inputClass, primaryButton } from "../utils/styles";

const empty = {
  title: "",
  company: "",
  location: "",
  salary: "",
  type: "Full-time",
  description: "",
};

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function JobForm({ initialValues, onSubmit, submitLabel }) {
  const [values, setValues] = useState(
    initialValues ? { ...empty, ...initialValues } : empty
  );
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const titleRef = useRef(null);
  const formId = useId();

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.company.trim()) e.company = "Company is required";
    if (!values.location.trim()) e.location = "Location is required";
    if (!values.salary || Number(values.salary) <= 0)
      e.salary = "Enter a valid yearly salary";
    if (values.description.trim().length < 20)
      e.description = "Description must be at least 20 characters";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await onSubmit({
        ...values,
        title: values.title.trim(),
        company: values.company.trim(),
        location: values.location.trim(),
        description: values.description.trim(),
        salary: Number(values.salary),
      });
    } catch (err) {
      setSubmitError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field id={`${formId}-title`} label="Job title" error={errors.title}>
        <input
          id={`${formId}-title`}
          ref={titleRef}
          name="title"
          value={values.title}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>

      <Field id={`${formId}-company`} label="Company" error={errors.company}>
        <input
          id={`${formId}-company`}
          name="company"
          value={values.company}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${formId}-location`} label="Location" error={errors.location}>
          <input
            id={`${formId}-location`}
            name="location"
            value={values.location}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field id={`${formId}-salary`} label="Salary (₹ per year)" error={errors.salary}>
          <input
            id={`${formId}-salary`}
            name="salary"
            type="number"
            value={values.salary}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id={`${formId}-type`} label="Job type">
        <select
          id={`${formId}-type`}
          name="type"
          value={values.type}
          onChange={handleChange}
          className={inputClass}
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
        </select>
      </Field>

      <Field
        id={`${formId}-description`}
        label="Description"
        error={errors.description}
      >
        <textarea
          id={`${formId}-description`}
          name="description"
          rows={5}
          value={values.description}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <button type="submit" disabled={submitting} className={primaryButton}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default JobForm;