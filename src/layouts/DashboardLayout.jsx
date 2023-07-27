import { BriefcaseIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const DashboardLayout = () => {
  const {
    state: { user },
  } = useAuthContext();

  return (
    <section>
      <div className="container">
        <div className="dashboard">
          <aside>
            <div className="links">
              {user?.role === "employer" && (
                <>
                  <div className="link">
                    <Link to="/dashboard">
                      <BriefcaseIcon width={20} />
                      <span>My Jobs</span>
                    </Link>
                  </div>
                  <div className="link">
                    <Link to="/dashboard/create">
                      <PlusCircleIcon width={20} />
                      <span>Post Job</span>
                    </Link>
                  </div>
                </>
              )}
              {user.role === "applicant" && (
                <>
                  <div className="link">
                    <Link to="/dashboard">
                      <BriefcaseIcon width={20} />
                      <span>My Applications</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </aside>
          <section>
            <Outlet />
          </section>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
