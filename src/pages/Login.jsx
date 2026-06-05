import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Login({ isLoggedIn, onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoginError("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const result = onLogin(formData.username, formData.password);

    if (result.success) {
      navigate(redirectPath, { replace: true });
    } else {
      setLoginError(result.message);
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Library Login</h1>
        

        {loginError && <p className="error center">{loginError}</p>}

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit" className="primary-btn full-width">
          Login
        </button>
      </form>
    </main>
  );
}

export default Login;
