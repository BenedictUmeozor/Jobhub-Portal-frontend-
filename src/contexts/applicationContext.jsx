import { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const ApplicationContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_APPLICATIONS":
      return { ...state, applications: action.payload };
    case "ADD_APPLICATION":
      return {
        ...state,
        applications: [action.payload, ...state.applications],
      };
    case "DELETE_APPLICATION":
      return {
        ...state,
        applications: state.applications.filter(
          (application) => application._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ApplicationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    applications: [],
  });
  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    const fetchAppications = async () => {
      const response = await fetch(
        "https://jobhub-xakf.onrender.com/api/applications/applicant",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        dispatch({
          type: "SET_APPLICATIONS",
          payload: [],
        });
      }

      if (response.ok) {
        dispatch({
          type: "SET_APPLICATIONS",
          payload: data,
        });
      }
    };

    if (user) {
      fetchAppications();
    }
  }, [user]);

  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationContext.Provider>
  );
};
