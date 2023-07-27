import { Link } from "react-router-dom";
import heroImage from "../assets/hero.svg";
import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Job from "../components/Job";
import PaginationComponent from "../components/Pagination";
import { useJobContext } from "../hooks/useJobContext";

const Home = () => {
  const { data } = useJobContext();

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="left-col">
            <h2>Unlock Your Career Potential: Find Your Perfect Job Today!</h2>
            <p className="hero-text">
              Unleash your potential, find your dream job with just one click.
              Our user-friendly platform connects you with tailored
              opportunities that match your unique skills and ambitions. Whether
              you're a seasoned professional or a fresh graduate, we empower you
              to discover and seize the perfect career path. Step into a
              brighter future today!
            </p>
            <Link to="/jobs">
              <span>Find jobs</span>
              <MagnifyingGlassIcon width={20} />
            </Link>
          </div>
          <div className="right-col">
            <img src={heroImage} alt="Hero Image" />
          </div>
        </div>
      </section>
      <section>
        <div className="container listings">
          <h3>
            Latest Job Openings
          </h3>
          <p>
            Stay ahead of the curve with our platform's latest job openings,
            offering fresh opportunities tailored to your skills and
            aspirations. Don't miss your chance to embark on a rewarding career
            journey - explore and apply today!
          </p>
          <div className="job-list">
            {data?.length ? (
              data.map((job) => <Job key={job._id} job={job} />)
            ) : (
              <div>No Jobs has been posted yet</div>
            )}
          </div>

          <div>
            <PaginationComponent />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
