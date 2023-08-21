import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";
import logo from "../images/logo192.png";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      const result = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("jwt_token", result.data.token);
      navigate("/Homepage");
    } catch (error) {
      setError(error.response.data.message);
      console.error("An error occurred during login:", error);
    }
  };

  const signUp = () => {
    navigate("/signup");
  };

  return (
    <div className="signin_container">
      <img className="sidenav__logo" src={logo} alt=" Logo" />
      <div>
        <h2>Sign In</h2>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      {error && <p className="error_message">{error}</p>}
      <div className="signin_signup">
        <div>
          <button onClick={submit}>Sign In</button>
        </div>
        <div>
          <button onClick={signUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
