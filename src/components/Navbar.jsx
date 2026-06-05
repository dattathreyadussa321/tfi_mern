import { NavLink } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <header className="navbar">
      <div>
        <h2>Library Manager</h2>
       
      </div>

      <nav>
        <NavLink to="/dashboard" end>
          Home
        </NavLink>

        <NavLink to="/dashboard/books">Books</NavLink>

        <NavLink to="/dashboard/books/add">Add Book</NavLink>

        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
