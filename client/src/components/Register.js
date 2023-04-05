import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Register() {
  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);
  const [cachedResponse, setCachedResponse] = useState({});
  const history = useNavigate();

  useEffect(() => {
    // Add input validation here
    if (!first_name || !email || !password || !passwordConfirmation) {
      setError("All fields are required");
    } else {
      setError("");
    }
  }, [last_name, first_name, email, password, passwordConfirmation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "last_name":
        setLastName(value);
        break;
      case "first_name":
      setFirstName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password_confirmation":
        setPasswordConfirmation(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsRegistering(true);
    if (first_name in cachedResponse) {
      const data = cachedResponse[first_name];
      if (data.message) {
        history.push("/login"); // redirect to login page
        return;
      } else {
        setError(data.errors);
        setIsRegistering(false);
        return;
      }
    }
    const response = await fetch("https://inkwell-library.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        last_name,
        first_name,
        email,
        password,
        password_confirmation: passwordConfirmation
      }),
    });
    const { message, errors } = await response.json();
    if (message) {
      history.push("/login"); // redirect to login page
    } else {
      setError(errors);
      setIsRegistering(false);
    }
    setCachedResponse({ ...cachedResponse, [first_name]: { message, errors } });
  };

  return (
    <div
      className="d-flex flex-column mb-3"
      style={{ width: "20rem", margin: "0 auto" }}
    >
      <div className="card ">
        <form onSubmit={handleSubmit} className="d-flex flex-column mb-3">
          <h1>Register</h1>
          <label>Firs Name:</label>
          <input
            placeholder="Enter your username"
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleInputChange}
          />
          <label>Last Name:</label>
          <input
            placeholder="Enter your last name"
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleInputChange}
          />

       

          <label>Email:</label>
          <input
            placeholder="Enter your email"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <label>Confirm password:</label>
          <input
            placeholder="Re-enter password"
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={handleInputChange}
          />
          
          <button type="submit">
            {isRegistering ? "Registering..." : "Register"}
          </button>

          <p>
            Already a member? <NavLink to="/login">Login</NavLink>
          </p>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
