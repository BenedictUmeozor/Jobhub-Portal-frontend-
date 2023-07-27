import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page-404">
      <div className="container">
        <h2>404</h2>
        <p>Page not found</p>
        <p>
          Go back to <Link to={"/"}>Home</Link>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
