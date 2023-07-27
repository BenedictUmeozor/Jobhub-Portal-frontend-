import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Details from "./Details";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const JobApplication = ({ application, pageId, pageTitle }) => {
  const [showModal, setShowModal] = useState(false);

  const { applicant } = application;

  console.log(pageId, pageTitle);

  const navigate = useNavigate(`/dashboard`);

  const {
    state: { user },
  } = useAuthContext();

  const handleClick = async (event, id) => {
    let res;
    if (event === "accept") {
      res = await fetch(`http://localhost:3000/api/applications/accept/${id}`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + user.token,
        },
      });
    } else if (event === "reject") {
      res = await fetch(`http://localhost:3000/api/applications/reject/${id}`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + user.token,
        },
      });
    }

    const json = await res.json();

    if (!res.ok) {
      throw new Error("Could not " + event + " application");
    }
    navigate(`/dashboard`);
    return toast.success(`Application ${event}ed successfully`, {
      className: "custom-toast-success",
    });
  };

  return (
    <>
      {showModal && (
        <Details
          summary={application.summary}
          onShow={() => setShowModal(false)}
        />
      )}
      <div className="job-app">
        <h2>{applicant.firstname + " " + applicant.lastname}</h2>
        <p>
          Applied{" "}
          {formatDistanceToNow(new Date(application.createdAt), {
            addSuffix: true,
          })}
        </p>
        <button className="details-btn" onClick={() => setShowModal(true)}>
          see message
        </button>
        <div className="btn-group">
          <button
            disabled={application.status === "accepted"}
            onClick={() => handleClick("accept", application._id)}
          >
            Accept
          </button>
          <button
            disabled={application.status === "rejected"}
            onClick={() => handleClick("reject", application._id)}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
};

export default JobApplication;
