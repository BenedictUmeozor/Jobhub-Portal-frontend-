import Application from "../components/Application";
import { useAppllicationContext } from "../hooks/useApplicationContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MyApplications = () => {
  const {
    state: { user },
  } = useAuthContext();

  const {
    state: { applications },
  } = useAppllicationContext();

  return (
    <section className="applicant">
      <h3 className="welcome-text">Welcome, {user?.firstname}</h3>
      {applications && applications.length > 0 ? (
        <div className="job-applications">
          {applications.map((application) => (
            <Application key={application._id} application={application} />
          ))}
        </div>
      ) : (
        <p>You have not applied for any jobs</p>
      )}
    </section>
  );
};

export default MyApplications;
