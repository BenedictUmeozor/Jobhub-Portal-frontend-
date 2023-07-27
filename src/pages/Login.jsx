import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setLoading(false);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "SET_USER",
        payload: data,
      });
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <div className="container">
        {error && <div className="error">{error}</div>}
        <form className="auth" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="form-field">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="submit">
            <button disabled={loading} type="submit">
              {loading ? "Please wait..." : "Login"}
            </button>
          </div>
          {error && <p className="small-error">check errors and try again</p>}
          <p className="auth-change">
            Don't have an account? <Link to="/register">register</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
