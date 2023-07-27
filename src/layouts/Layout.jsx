import { Link, NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthContext } from "../hooks/useAuthContext";

const Layout = () => {
  const {
    state: { user },
    dispatch,
  } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
    });
    console.log("Logged out");
  };

  return (
    <>
      <header>
        <div className="container">
          <Link to="/">
            <h1 className="logo">Jobhub</h1>
          </Link>
          <nav>
            {!user && (
              <>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <button onClick={logout}>Logout</button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="container">
          <p>Copyright &copy; 2023 Jobhub | Created by Benedict</p>
        </div>
      </footer>
      <ToastContainer />
    </>
  );
};

export default Layout;
