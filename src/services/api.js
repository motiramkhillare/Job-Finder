export const API_URL = "http://localhost:3001";

async function request(path, options = {}) {
  const response = await fetch(API_URL + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    throw new Error("Request failed. Please try again.");
  }
  if (response.status === 204) return null;
  return response.json();
}

export const createJob = (job) =>
  request("/jobs", { method: "POST", body: JSON.stringify(job) });

export const updateJob = (id, job) =>
  request(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(job) });

export const deleteJob = (id) => request(`/jobs/${id}`, { method: "DELETE" });

export const loginUser = (email, password) =>
  request(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );

export const getUsersByEmail = (email) =>
  request(`/users?email=${encodeURIComponent(email)}`);

export const createUser = (user) =>
  request("/users", { method: "POST", body: JSON.stringify(user) });