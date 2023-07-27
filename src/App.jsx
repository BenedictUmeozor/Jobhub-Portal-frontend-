import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Create from "./pages/Create";
import DashboardLayout from "./layouts/DashboardLayout";
import MyJobs from "./pages/MyJobs";
import JobDetails, { detailsLoader } from "./pages/JobDetails";
import Edit, { editLoader } from "./pages/Edit";
import MyApplications from "./pages/MyApplications";
import Apply, { applyLoader } from "./pages/Apply";
import JobApplications from "./pages/JobApplications";
import Jobs, { jobLoader } from "./pages/Jobs";
import NotFound from "./pages/404";

const App = () => {
  const {
    state: { user },
  } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<NotFound />}>
        <Route index element={<Home />} errorElement={<NotFound />} />
        <Route
          path="register"
          element={!user ? <Register /> : <Navigate to="/" replace={true} />}
        />
        <Route
          path="login"
          element={!user ? <Login /> : <Navigate to="/" replace={true} />}
        />
        <Route
          path="dashboard"
          element={
            user ? <DashboardLayout /> : <Navigate to="/login" replace={true} />
          }
        >
          <Route
            index
            element={
              user ? (
                user.role === "employer" ? (
                  <MyJobs />
                ) : (
                  <MyApplications />
                )
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="create"
            element={
              user ? (
                user.role === "employer" ? (
                  <Create />
                ) : (
                  <Navigate to="/dashboard" replace={true} />
                )
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="edit/:id"
            element={
              user ? (
                user.role === "employer" ? (
                  <Edit />
                ) : (
                  <Navigate to="/dashboard" replace={true} />
                )
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
            loader={editLoader}
            errorElement={<NotFound />}
          />
          <Route
            path="applications/:id/:title"
            element={
              user ? (
                user.role === "employer" ? (
                  <JobApplications />
                ) : (
                  <Navigate to="/dashboard" replace={true} />
                )
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
            errorElement={<NotFound />}
          />
        </Route>
        <Route
          path="jobs/:id"
          element={<JobDetails />}
          loader={detailsLoader}
          errorElement={<NotFound />}
        />
        <Route
          path="apply/:id"
          element={
            user ? (
              user.role === "applicant" ? (
                <Apply />
              ) : (
                <Navigate to="/dashboard" replace={true} />
              )
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
          errorElement={<NotFound />}
          loader={applyLoader}
        />
        <Route path="/jobs" element={<Jobs />} loader={jobLoader} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
