import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { initialBooks } from "./data/initialBooks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  checkLogin,
  isUserLoggedIn,
  removeLogin,
  saveLogin,
} from "./utils/auth";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Home from "./pages/Home";
import BooksList from "./pages/BooksList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import NotFound from "./pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [books, setBooks] = useLocalStorage("library-books", initialBooks);

  useEffect(() => {
    document.title = isLoggedIn ? "Library Dashboard" : "Library Login";
  }, [isLoggedIn]);

  function handleLogin(username, password) {
    const isValidUser = checkLogin(username, password);

    if (isValidUser) {
      saveLogin();
      setIsLoggedIn(true);

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: "Invalid username or password",
    };
  }

  function handleLogout() {
    removeLogin();
    setIsLoggedIn(false);
  }

  function addBook(newBook) {
    const bookWithId = {
      id: crypto.randomUUID(),
      ...newBook,
    };

    setBooks((previousBooks) => [...previousBooks, bookWithId]);
  }

  function deleteBook(bookId) {
    setBooks((previousBooks) =>
      previousBooks.filter((book) => book.id !== bookId)
    );
  }

  function updateBook(bookId, updatedBook) {
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book.id === bookId ? { ...book, ...updatedBook } : book
      )
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/login"
        element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin} />}
      />

      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route
          path="/dashboard"
          element={<DashboardLayout onLogout={handleLogout} />}
        >
          <Route index element={<Home books={books} />} />

          <Route
            path="books"
            element={<BooksList books={books} onDeleteBook={deleteBook} />}
          />

          <Route path="books/add" element={<AddBook onAddBook={addBook} />} />

          <Route
            path="books/edit/:id"
            element={<EditBook books={books} onUpdateBook={updateBook} />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
