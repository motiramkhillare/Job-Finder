import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const JobDetails = lazy(() => import("./pages/JobDetails.jsx"));
const Saved = lazy(() => import("./pages/Saved.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashbord.jsx"));
const JobFormPage = lazy(() => import("./pages/JobFormPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="saved" element={<Saved />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<ProtectedRoute role="recruiter" />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/new" element={<JobFormPage />} />
          <Route path="dashboard/edit/:id" element={<JobFormPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;