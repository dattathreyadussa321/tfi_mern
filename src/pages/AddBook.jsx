import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";

function AddBook({ onAddBook }) {
  const navigate = useNavigate();

  function handleAddBook(bookData) {
    onAddBook(bookData);
    navigate("/dashboard/books");
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Add Book</h1>
          <p>Create a new book record using a controlled form.</p>
        </div>
      </div>

      <BookForm buttonText="Add Book" onSubmit={handleAddBook} />
    </section>
  );
}

export default AddBook;
