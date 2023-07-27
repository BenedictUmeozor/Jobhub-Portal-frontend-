import { TrashIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAppllicationContext } from "../hooks/useApplicationContext";

const Application = (application) => {
  const obj = application.application;
  const {
    state: { user },
  } = useAuthContext();

  const { dispatch } = useAppllicationContext();

  const handleClick = async (id) => {
    const response = await fetch(
      "https://jobhub-xakf.onrender.com/api/applications/" + id,
      {
        method: "DELETE",
        headers: { authorization: "Bearer " + user.token },
      }
    );

    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: "DELETE_APPLICATION",
        payload: data,
      });
    }
  };

  return (
    <div className="job-application">
      <div className="flex-between">
        <Link to={"/jobs/" + obj.job._id}>
          <h3 className="job-application-title">{obj.job.title}</h3>
        </Link>
        <TrashIcon
          className="job-application-delete"
          color="crimson"
          width={20}
          title="delete application"
          onClick={() => handleClick(obj._id)}
        />
      </div>
      <p className="job-application-category">{obj.job.category}</p>
      <p className="job-application-status">
        Status: <span>{obj.status}</span>
      </p>
      <div className="job-application-applicant">
        <UserGroupIcon width={20} color="#004166" />
        <span>{obj.job.applicants} applicants</span>
      </div>
      <p className="job-application-time">
        You applied{" "}
        {formatDistanceToNow(new Date(obj.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default Application;
