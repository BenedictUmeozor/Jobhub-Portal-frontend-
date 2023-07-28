import { Suspense, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CategorySelect from "../components/filters/category";
import ModeSelect from "../components/filters/mode";
import TypeSelect from "../components/filters/type";
import Job from "../components/Job";

const Jobs = () => {
  const { data } = useLoaderData();
  const [jobs, setJobs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modeValue, setModeValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);

  const handleModeChange = (value) => {
    setModeValue(value);
    filterJobs({ type: "select", value, element: "mode" });
  };

  const handleTypeChange = (value) => {
    setTypeValue(value);
    filterJobs({ type: "select", value, element: "type" });
  };

  const handleCategoryChange = (value) => {
    setCategoryValue(value);
    filterJobs({ type: "select", value, element: "category" });
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    filterJobs({ type: "input", value, element: "input" });
  };

  const clearFields = () => {
    setSearchTerm("");
    handleModeChange("");
    handleCategoryChange("");
    handleTypeChange("");
    setJobs(data);
  };

  const filterJobs = ({ type, value, element }) => {
    let filteredJobs;

    if (type === "input" && element === "input") {
      if (!modeValue && !typeValue && !categoryValue) {
        if (!value) {
          setJobs(data);
          return;
        }
        filteredJobs = data.filter((job) =>
          job.title.toLowerCase().includes(value.toLowerCase())
        );
        setJobs(filteredJobs);
        return;
      }

      if (modeValue && !typeValue && !categoryValue) {
        filteredJobs = data.filter(
          (job) =>
            job.title.toLowerCase().includes(value.toLowerCase()) &&
            job.mode === modeValue.toLowerCase()
        );
        setJobs(filteredJobs);
      }

      if (modeValue && !typeValue && categoryValue) {
        filteredJobs = data.filter(
          (job) =>
            job.title.toLowerCase().includes(value.toLowerCase()) &&
            job.mode === modeValue.toLowerCase() &&
            job.type === categoryValue.toLowerCase()
        );
        setJobs(filteredJobs);
      }

      if (modeValue && typeValue && !categoryValue) {
        filteredJobs = data.filter(
          (job) =>
            job.title.toLowerCase().includes(value.toLowerCase()) &&
            job.mode === modeValue.toLowerCase() &&
            job.type === typeValue.toLowerCase()
        );
        setJobs(filteredJobs);
      }

      if (modeValue && typeValue && categoryValue) {
        filteredJobs = data.filter(
          (job) =>
            job.title.toLowerCase().includes(value.toLowerCase()) &&
            job.mode === modeValue.toLowerCase() &&
            job.type === typeValue.toLowerCase() &&
            job.category === categoryValue.toLowerCase()
        );
        setJobs(filteredJobs);
        return;
      }
    }

    if (type === "select") {
      if (!searchTerm) {
        if (element === "mode") {
          if (!typeValue && !categoryValue) {
            filteredJobs = data.filter((job) => job.mode === value);
            setJobs(filteredJobs);
            return;
          }

          if (typeValue && !categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.mode === value && job.type === typeValue.toLowerCase()
            );
            setJobs(filteredJobs);
            return;
          }

          if (!typeValue && categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.mode === value &&
                job.category === categoryValue.toLowerCase()
            );
            setJobs(filteredJobs);
            return;
          }

          if (typeValue && categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.mode === value &&
                job.type === typeValue.toLowerCase() &&
                job.category === categoryValue.toLowerCase()
            );
            setJobs(filteredJobs);
            return;
          }
        }

        if (element === "type") {
          if (!modeValue && !categoryValue) {
            filteredJobs = data.filter((job) => job.type === value);
            setJobs(filteredJobs);
            return;
          }

          if (modeValue && !categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.type === value && job.mode === modeValue.toLowerCase()
            );
            setJobs(filteredJobs);
            return;
          }

          if (!modeValue && categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.type === value &&
                job.category === categoryValue.toLowerCase()
            );
            setJobs(filteredJobs);
            return;
          }

          if (modeValue && categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.type === value &&
                job.category === categoryValue.toLowerCase() &&
                job.mode === modeValue.toLowerCase()
            );
            setJobs(filteredJobs);
            return;
          }
        }

        if (element === "category") {
          if (!modeValue && !typeValue) {
            filteredJobs = data.filter((job) => job.category === value);
            setJobs(filteredJobs);
            return;
          }

          if (modeValue && !typeValue) {
            filteredJobs = data.filter(
              (job) =>
                job.category === value && job.mode === modeValue.toLowerCase()
            );
            setJobs(filteredJobs);
            return;
          }

          if (!modeValue && typeValue) {
            filteredJobs = data.filter(
              (job) =>
                job.category === value && job.type === typeValue.toLowerCase()
            );
            setJobs(filteredJobs);
            return;
          }

          if (modeValue && typeValue) {
            filteredJobs = data.filter(
              (job) =>
                job.category === value &&
                job.type === typeValue.toLowerCase() &&
                job.mode === modeValue.toLowerCase()
            );
            setJobs(filteredJobs);
            return;
          }
        }
      }

      if (searchTerm) {
        if (element === "mode") {
          if (!typeValue && !categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.mode === value &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }

          if (typeValue && !categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.mode === value &&
                job.type === typeValue.toLowerCase() &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }

          if (!typeValue && categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.mode === value &&
                job.category === categoryValue.toLowerCase() &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }

          if (typeValue && categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.mode === value &&
                job.type === typeValue.toLowerCase() &&
                job.category === categoryValue.toLowerCase() &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }
        }

        if (element === "type") {
          if (!modeValue && !categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.type === value &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }

          if (modeValue && !categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.type === value &&
                job.mode === modeValue.toLowerCase() &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }

          if (!modeValue && categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.type === value &&
                job.category === categoryValue.toLowerCase() &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }

          if (modeValue && categoryValue) {
            filteredJobs = data.filter(
              (job) =>
                job.type === value &&
                job.category === categoryValue.toLowerCase() &&
                job.mode === modeValue.toLowerCase() &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }
        }

        if (element === "category") {
          if (!modeValue && !typeValue) {
            filteredJobs = data.filter(
              (job) =>
                job.category === value &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }

          if (modeValue && !typeValue) {
            filteredJobs = data.filter(
              (job) =>
                job.category === value &&
                job.mode === modeValue.toLowerCase() &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }

          if (!modeValue && typeValue) {
            filteredJobs = data.filter(
              (job) =>
                job.category === value &&
                job.type === typeValue.toLowerCase() &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }

          if (modeValue && typeValue) {
            filteredJobs = data.filter(
              (job) =>
                job.category === value &&
                job.type === typeValue.toLowerCase() &&
                job.mode === modeValue.toLowerCase() &&
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
            return;
          }
        }
      }
    }
  };

  useEffect(() => {
    setJobs(data);
  }, [data]);

  return (
    <section>
      <div className="container">
        <div className="main-filter">
          <div className="filter-input">
            <input
              type="text"
              placeholder="filter by title"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="filters">
            <CategorySelect
              value={categoryValue}
              onChange={handleCategoryChange}
            />
            <ModeSelect value={modeValue} onChange={handleModeChange} />
            <TypeSelect value={typeValue} onChange={handleTypeChange} />
          </div>
          <button onClick={clearFields}>Clear</button>
        </div>

        <Suspense
          fallback={<div style={{ textAlign: "center" }}>Loading...</div>}
        >
          {jobs && jobs.length > 0 && (
            <p
              style={{
                marginTop: "2rem",
              }}
            >
              Showing <strong>{jobs.length}</strong> jobs
            </p>
          )}
          <div className="job-container">
            {jobs && jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job._id} className="job-container-job">
                  <Job job={job} />
                </div>
              ))
            ) : (
              <p>There are currently no available jobs</p>
            )}
          </div>
        </Suspense>
      </div>
    </section>
  );
};

export default Jobs;

export const jobLoader = async () => {
  const response = await fetch("https://jobhub-xakf.onrender.com/api/jobs/all");
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Couldn't find jobs");
  }
  return { data };
};
