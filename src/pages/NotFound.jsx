import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found">
      <div>
        <h1>404</h1>
        <p>Page not found.</p>

        <Link to="/dashboard" className="primary-link">
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
