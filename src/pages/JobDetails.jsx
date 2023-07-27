import {
  BanknotesIcon,
  BriefcaseIcon,
  HomeModernIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { Link, useLoaderData } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

export const detailsLoader = async ({ params }) => {
  const { id } = params;

  const response = await fetch(`https://jobhub-xakf.onrender.com/api/jobs/${id}`);
  const job = await response.json();

  return { id, job };
};

const JobDetails = () => {
  const { id, job } = useLoaderData();
  const [applied, setApplied] = useState(false);
  const [application, setApplication] = useState(null);

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    const fetchApplication = async () => {
      const res = await fetch(
        "https://jobhub-xakf.onrender.com/api/applications/application/" + id,
        {
          method: "POST",
          headers: { authorization: "Bearer " + user.token },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setApplied(false);
        setApplication(null);
      } else {
        setApplied(true);
        setApplication(data);
      }
    };

    if (user && user.role === "applicant") {
      fetchApplication();
    }
  }, [user]);

  return (
    <section className="details">
      <div className="container">
        <div className="header">
          <h2 className="title">{job.title}</h2>
          <h5 className="company">{job.companyname}</h5>
          <h6 className="location">{job.location}</h6>
        </div>

        <div className="job-details">
          <div className="category">
            <TagIcon width={20} color="#004166" />
            <div>
              <p>Job Category</p>
              <span>{job.category}</span>
            </div>
          </div>
          <div className="salary">
            <BanknotesIcon width={20} color="#004166" />
            <div>
              <p>Salary</p>
              <span>${job.salary.toLocaleString()} a month</span>
            </div>
          </div>
          <div className="type">
            <BriefcaseIcon width={20} color="#004166" />
            <div>
              <p>Job Type</p>
              <span>{job.type}</span>
            </div>
          </div>
          <div className="mode">
            <HomeModernIcon width={20} color="#004166" />
            <div>
              <p>Job Mode</p>
              <span>{job.mode}</span>
            </div>
          </div>
        </div>

        <hr />

        <div className="job-summary">
          <h3 className="summary-title">Job Summary</h3>
          <div
            className="summary "
            dangerouslySetInnerHTML={{ __html: job.summary }}
          />
        </div>

        {!user ||
          (user.role !== "employer" &&
            (!applied ? (
              <Link to={"/apply/" + job._id}>Apply now</Link>
            ) : application?.status === "pending" ? (
              <p>Your application is pending</p>
            ) : application?.status === "accepted" ? (
              <p className="success">Your application has been accepted</p>
            ) : (
              <div>
                <p className="error-text">Your application was rejected</p>
                <button>Cancel Application</button>
              </div>
            )))}
      </div>
    </section>
  );
};

export default JobDetails;
