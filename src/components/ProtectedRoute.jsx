import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ isLoggedIn }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
