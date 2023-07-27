import {
  BanknotesIcon,
  BriefcaseIcon,
  HomeModernIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import MyEditor from "../components/MyEditor";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAppllicationContext } from "../hooks/useApplicationContext";

export const applyLoader = async ({ params }) => {
  const { id } = params;

  const response = await fetch("https://jobhub-xakf.onrender.com/api/jobs/" + id);
  const job = await response.json();

  return { job };
};

const Apply = () => {
  const { job } = useLoaderData();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const navigate = useNavigate();

  const {
    state: { user },
  } = useAuthContext();

  const { dispatch } = useAppllicationContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("http://localhost:3000/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({
        job: job._id,
        summary: content,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setLoading(false);
    } else {
      dispatch({
        type: "ADD_APPLICATION",
        payload: data,
      });
      return navigate("/dashboard");
    }
  };

  useEffect(() => {
    const fetchApplication = async () => {
      setApplied(false);
      const res = await fetch(
        "http://localhost:3000/api/applications/application/" + job._id,
        {
          method: "POST",
          headers: { authorization: "Bearer " + user.token },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setApplied(true);
      }
    };

    if (user && user.role === "applicant") {
      fetchApplication();
    }
  }, [user, job]);

  return (
    <div className="application">
      <div className="container">
        <h2 className="header">
          Application for <Link to={"/jobs/" + job._id}>{job.title}</Link>
        </h2>

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

        <div className="confirmation">
          <p>
            Make sure you have read the requirements by{" "}
            <Link to={"/jobs/" + job._id}>{job.companyname}</Link>
          </p>
          <form className="confirm" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <label>Tell the recruiter why you are best fit for the job</label>
            <MyEditor
              content={content}
              handleChange={(value) => setContent(value)}
            />
            <div>
              {applied ? (
                <p
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  You have already applied for this job
                </p>
              ) : (
                <button type="submit" disabled={loading}>
                  {loading ? "Please wait..." : "Confirm application"}
                </button>
              )}
            </div>
            {error && <p className="small-error">check errors and try again</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;
