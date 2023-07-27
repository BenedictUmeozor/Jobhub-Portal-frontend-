import { TrashIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEmployerJobContext } from "../hooks/useEmployerJobContext";

const EmployerJob = ({ job }) => {
  const {
    state: { user },
  } = useAuthContext();
  const { dispatch } = useEmployerJobContext();

  const handleClick = async (_id) => {
    const response = await fetch("http://localhost:3000/api/jobs/" + _id, {
      method: "DELETE",
      headers: { authorization: "Bearer " + user.token },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: "DELETE_JOB",
        payload: data,
      });
    }
  };

  return (
    <div className="employer-job">
      <div className="header flex-between">
        <h3>{job.title}</h3>
        <TrashIcon
          width={20}
          onClick={() => handleClick(job._id)}
          color="crimson"
          className="delete"
        />
      </div>
      <div className="applicants">
        <UserGroupIcon width={20} color="#004166" />
        <span>{job.applicants} persons applied</span>
      </div>
      <div className="job-links">
        <Link to={"edit/" + job._id}>Edit</Link>
        <Link to={"/dashboard/applications/" + job._id + "/" + job.title}>
          Applications
        </Link>
      </div>
    </div>
  );
};

export default EmployerJob;
