import { Link, useNavigate, useParams } from "react-router-dom";
import BookForm from "../components/BookForm";

function EditBook({ books, onUpdateBook }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const bookToEdit = books.find((book) => book.id === id);

  if (!bookToEdit) {
    return (
      <section className="empty-state">
        <h2>Book Not Found</h2>
        <p>The book you are trying to edit does not exist.</p>
        <Link to="/dashboard/books" className="primary-link">
          Back to Books
        </Link>
      </section>
    );
  }

  function handleUpdateBook(updatedBookData) {
    onUpdateBook(id, updatedBookData);
    navigate("/dashboard/books");
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Edit Book</h1>
          <p>Update an existing book using the same reusable form.</p>
        </div>
      </div>

      <BookForm
        initialValues={bookToEdit}
        buttonText="Update Book"
        onSubmit={handleUpdateBook}
      />
    </section>
  );
}

export default EditBook;
