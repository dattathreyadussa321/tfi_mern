import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function DashboardLayout({ onLogout }) {
  return (
    <div>
      <Navbar onLogout={onLogout} />

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
