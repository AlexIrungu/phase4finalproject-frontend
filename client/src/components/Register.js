import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            onRegister(user);
            navigate("/");
          });
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label>Enter your name</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirst_Name(e.target.value)}
            placeholder="Enter firstname"
          />
        </div>
        
        <div>
          <label>Enter your last name</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLast_Name(e.target.value)}
            placeholder="Enter lastname"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;