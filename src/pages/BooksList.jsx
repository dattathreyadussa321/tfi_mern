import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

function BooksList({ books, onDeleteBook }) {
  const [searchText, setSearchText] = useState("");

  const filteredBooks = books.filter((book) => {
    const searchValue = searchText.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue) ||
      book.category.toLowerCase().includes(searchValue)
    );
  });

  function handleDelete(bookId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      onDeleteBook(bookId);
    }
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Books</h1>
          <p>View, search, edit, and delete books.</p>
        </div>

        <Link to="/dashboard/books/add" className="primary-link">
          Add Book
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search by title, author, or category"
        />
      </div>

      {filteredBooks.length === 0 ? (
        <EmptyState message="No books match your search." />
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <article key={book.id} className="book-card">
              <div>
                <h3>{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Category:</strong> {book.category}
                </p>
                <p>
                  <strong>Total Copies:</strong> {book.totalCopies}
                </p>
                <p>
                  <strong>Available:</strong> {book.availableCopies}
                </p>

                {book.availableCopies > 0 ? (
                  <span className="badge success">Available</span>
                ) : (
                  <span className="badge danger">Out of Stock</span>
                )}
              </div>

              <div className="card-actions">
                <Link
                  to={`/dashboard/books/edit/${book.id}`}
                  className="edit-btn"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(book.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default BooksList;
