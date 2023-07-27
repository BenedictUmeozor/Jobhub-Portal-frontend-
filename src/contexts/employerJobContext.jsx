import { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const employerJobContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_JOBS":
      return { ...state, jobs: action.payload };
    case "ADD_JOB":
      return { ...state, jobs: [action.payload, ...state.jobs] };
    case "EDIT_JOB":
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
      };
    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const EmployerJobContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
  });

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("http://localhost:3000/api/jobs/employer", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch({
          type: "SET_JOBS",
          payload: [],
        });
        console.log(data);
      }

      if (response.ok) {
        dispatch({
          type: "SET_JOBS",
          payload: data,
        });
      }
    };

    if (user) {
      fetchJobs();
    }
  }, [user]);

 

  return (
    <employerJobContext.Provider value={{ state, dispatch }}>
      {children}
    </employerJobContext.Provider>
  );
};
