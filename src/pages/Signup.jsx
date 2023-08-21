import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import logo from "../images/logo192.png";

const Signup = () => {
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  // const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async () => {
    if (!first_name || !last_name || !email || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const result = await axios.post("http://localhost:8000/users/", {
        first_name,
        last_name,
        email,
        password,
      });
      if (result.data.message === "User created successfully!") {
        setResultMessage("User created successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      if (error.response.data.message) {
        setResultMessage(error.response.data.message);
      }
    }
  };

  const goToSignIn = () => {
    navigate("/");
  };

  return (
    <div className="signup_container">
      <img className="sidenav__logo" src={logo} alt=" Logo" />
      <div>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="First_Name"
          onChange={(e) => setFirst_name(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last_name"
          onChange={(e) => setLast_name(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        /> */}
      </div>
      {errorMessage && <p className="error_message">{errorMessage}</p>}
      <div className="signin_signup">
        <div>
          <button onClick={goToSignIn}>Back</button>
        </div>
        <div>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
      <div className="message">
        {resultMessage && (
          <p
            className={`message-text ${
              resultMessage === "User created successfully!"
                ? "success"
                : "error"
            }`}
          >
            {resultMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
