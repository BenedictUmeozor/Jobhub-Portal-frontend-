import EmployerJob from "../components/EmployerJob";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEmployerJobContext } from "../hooks/useEmployerJobContext";

const MyJobs = () => {
  const {
    state: { user },
  } = useAuthContext();

  const {
    state: { jobs },
    dispatch,
  } = useEmployerJobContext();

  return (
    <section className="employer">
      <h3 className="welcome-text">Welcome, {user?.firstname}</h3>

      {jobs && jobs.length === 0 ? (
        <div>You have posted no Jobs</div>
      ) : (
        <div className="employer-jobs">
          {jobs?.map((job) => (
            <EmployerJob key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyJobs;
