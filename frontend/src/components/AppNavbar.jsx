import { NavLink } from 'react-router-dom';

function AppNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand fw-semibold" to="/customers">
          Policy Management
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="navbar-nav ms-auto gap-lg-2">
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>

            <NavLink className="nav-link" to="/policies">
              Policies
            </NavLink>

            <NavLink className="nav-link" to="/assign-policy">
              Assign Policy
            </NavLink>

            {/* NEW */}
            <NavLink className="nav-link" to="/ai-chat">
              AI Assistant
            </NavLink>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;