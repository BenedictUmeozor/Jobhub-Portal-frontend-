import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useAuthContext } from "../hooks/useAuthContext";

const Job = ({ job }) => {
  const {
    state: { user },
  } = useAuthContext();

  return (
    <div className="job">
      <div className="job-header">
        <div className="heading">
          <p className="job-category">{job.category}</p>
          <p className="job-time">
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </p>
        </div>

        <Link to={"/jobs/" + job._id} className="job-title">
          <h3>{job.title}</h3>
        </Link>
        <h5>{job.companyname}</h5>
        <h6>{job.location}</h6>
      </div>
      <div className="job-body">
        <div className="job-props">
          <p>{job.type}</p>
          <p>{job.mode}</p>
        </div>
      </div>
      <div className="job-footer">
        <div className="info">
          <p>
            <CurrencyDollarIcon width={20} color="#004166" />
            <span>
              {job.salary.toLocaleString()}{" "}
              <span className="month">/ month</span>
            </span>
          </p>
          <p>
            <UserGroupIcon width={20} color="#004166" />
            <span>{job.applicants} already applied</span>
          </p>
        </div>
        {user?.role !== "employer" && (
          <Link to={"/apply/" + job._id}>Apply now</Link>
        )}
      </div>
    </div>
  );
};

export default Job;
