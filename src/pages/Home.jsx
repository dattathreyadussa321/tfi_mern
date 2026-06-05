import { Link } from "react-router-dom";

function Home({ books }) {
  const totalBooks = books.length;

  const totalCopies = books.reduce((sum, book) => {
    return sum + book.totalCopies;
  }, 0);

  const availableCopies = books.reduce((sum, book) => {
    return sum + book.availableCopies;
  }, 0);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your simple library management app.</p>
        </div>

        <Link to="/dashboard/books/add" className="primary-link">
          Add New Book
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{totalBooks}</h2>
          <p>Total Book Titles</p>
        </div>

        <div className="stat-card">
          <h2>{totalCopies}</h2>
          <p>Total Copies</p>
        </div>

        <div className="stat-card">
          <h2>{availableCopies}</h2>
          <p>Available Copies</p>
        </div>
      </div>

      <div className="info-box">
        <h3>Concepts used on this page</h3>
        <p>
          This page uses props, array reduce, nested route layout, and Outlet.
        </p>
      </div>
    </section>
  );
}

export default Home;
