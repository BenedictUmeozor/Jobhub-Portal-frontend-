import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import JobApplication from "../components/JobApplication";

const JobApplications = () => {
  const { id, title } = useParams();
  const [applications, setApplications] = useState(null);
  const {
    state: { user },
  } = useAuthContext();

  const fetchApplications = async () => {
    const res = await fetch(
      `http://localhost:3000/api/applications/job/${id}`,
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + user.token,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      setApplications(data);
    } else {
      throw new Error("Could not get applications at this time");
    }
  };

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  return (
    <div className="employer-job-application">
      <h2>
        Job Applications for <Link to={"/jobs/" + id}>{title}</Link>
      </h2>

      <div
        style={{
          marginTop: "1.5rem",
        }}
        className="employer-job-applications"
      >
        {applications && applications.length > 0 ? (
          applications.map((application) => (
            <JobApplication
              key={application._id}
              application={application}
              pageId={id}
              pageTitle={title}
            />
          ))
        ) : (
          <p
            style={{
              marginTop: "1rem",
            }}
          >
            No applications for this job yet
          </p>
        )}
      </div>
    </div>
  );
};

export default JobApplications;
