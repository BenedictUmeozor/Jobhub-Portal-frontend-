import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("https://jobhub-xakf.onrender.com/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        role: role,
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
      return navigate('/dashboard')
    }

    
  };

  return (
    <section className="auth">
      <div className="container">
        {error && <div className="error">{error}</div>}
        <form className="auth" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-field">
            <label>First name:</label>
            <input
              type="text"
              value={firstname}
              placeholder="First name.."
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Last name:</label>
            <input
              type="text"
              value={lastname}
              placeholder="Last name.."
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
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
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="employer">employer</option>
              <option value="applicant">applicant</option>
            </select>
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
              {loading ? "Please wait..." : "Register"}
            </button>
          </div>
          {error && <p className="small-error">check errors and try again</p>}
          <p className="auth-change">
            Already have an account? <Link to="/login">login</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
