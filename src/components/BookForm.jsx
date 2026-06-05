import { useEffect, useState } from "react";

const emptyBook = {
  title: "",
  author: "",
  category: "",
  totalCopies: "",
  availableCopies: "",
};

function BookForm({ initialValues = emptyBook, buttonText, onSubmit }) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Book title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.totalCopies || Number(formData.totalCopies) <= 0) {
      newErrors.totalCopies = "Total copies must be greater than 0";
    }

    if (formData.availableCopies === "" || Number(formData.availableCopies) < 0) {
      newErrors.availableCopies = "Available copies cannot be negative";
    }

    if (Number(formData.availableCopies) > Number(formData.totalCopies)) {
      newErrors.availableCopies =
        "Available copies cannot be more than total copies";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const finalBookData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category.trim(),
      totalCopies: Number(formData.totalCopies),
      availableCopies: Number(formData.availableCopies),
    };

    onSubmit(finalBookData);
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Book Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
        />
        {errors.author && <p className="error">{errors.author}</p>}
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Example: Fiction, Programming"
        />
        {errors.category && <p className="error">{errors.category}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Total Copies</label>
          <input
            type="number"
            name="totalCopies"
            value={formData.totalCopies}
            onChange={handleChange}
          />
          {errors.totalCopies && <p className="error">{errors.totalCopies}</p>}
        </div>

        <div className="form-group">
          <label>Available Copies</label>
          <input
            type="number"
            name="availableCopies"
            value={formData.availableCopies}
            onChange={handleChange}
          />
          {errors.availableCopies && (
            <p className="error">{errors.availableCopies}</p>
          )}
        </div>
      </div>

      <button type="submit" className="primary-btn">
        {buttonText}
      </button>
    </form>
  );
}

export default BookForm;
