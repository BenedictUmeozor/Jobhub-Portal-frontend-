import { useState } from "react";
import MyEditor from "../components/MyEditor";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEmployerJobContext } from "../hooks/useEmployerJobContext";
import { useLoaderData, useNavigate } from "react-router-dom";

export const editLoader = async ({ params }) => {
  const { id } = params;

  const response = await fetch(`http://localhost:3000/api/jobs/${id}`);
  const job = await response.json();

  return { id, job };
};

const Edit = () => {
  const { id, job } = useLoaderData();

  const [title, setTitle] = useState(job.title);
  const [companyname, setcompanyname] = useState(job.companyname);
  const [location, setLocation] = useState(job.location);
  const [salary, setSalary] = useState(job.salary);
  const [type, setType] = useState(job.type);
  const [mode, setMode] = useState(job.mode);
  const [summary, setSummary] = useState(job.summary);
  const [category, setCategory] = useState(job.category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    state: { user },
  } = useAuthContext();

  const { dispatch } = useEmployerJobContext();

  const handleChange = (value) => {
    setSummary(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("https://jobhub-xakf.onrender.com/api/jobs/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + user?.token,
      },
      body: JSON.stringify({
        title: title,
        companyname: companyname,
        location: location,
        salary: salary,
        type: type,
        mode: mode,
        summary: summary,
        category: category,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setLoading(false);
    }

    if (response.ok) {
      dispatch({
        type: "EDIT_JOB",
        payload: data,
      });
      setLoading(false);
      return navigate("/dashboard");
    }
  };

  return (
    <section className="create">
      {error && <div className="error">{error}</div>}
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <h2>Post Job</h2>
        <div className="form-field">
          <label>Title:</label>
          <input
            type="text"
            placeholder="Job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Company name:</label>
          <input
            type="text"
            placeholder="Company name"
            value={companyname}
            onChange={(e) => setcompanyname(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Location:</label>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Salary:</label>
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="technology">technology</option>
            <option value="finance">finance</option>
            <option value="engineering">engineering</option>
            <option value="creative and media">creative and media</option>
            <option value="marketing">marketing</option>
            <option value="education">education</option>
          </select>
        </div>
        <div className="form-field">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="full-time">full-time</option>
            <option value="permanent">permanent</option>
            <option value="internship">internship</option>
            <option value="part-time">part-time</option>
          </select>
        </div>
        <div className="form-field">
          <label>Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="remote">remote</option>
            <option value="hybrid">hybrid</option>
            <option value="on-site">on-site</option>
          </select>
        </div>
        <div className="summary">
          <label>Summary:</label>
          <MyEditor content={summary} handleChange={handleChange} />
        </div>
        <div className="submit">
          <button disabled={loading}>
            {loading ? "Please wait..." : "Edit job"}
          </button>
        </div>
        {error && <p className="small-error">check errors and try again</p>}
      </form>
    </section>
  );
};

export default Edit;
