import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { user: action.payload };
    }
    case "LOGOUT": {
      return { user: null };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { user: null });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const checkToken = async (u) => {
      const response = await fetch("http://localhost:3000/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: u.token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem("user");
      } else {
        dispatch({
          type: "SET_USER",
          payload: u,
        });
      }
    };

    if (user) {
      checkToken(user);
    }
  }, []);


  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
