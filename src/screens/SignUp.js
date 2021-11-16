import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions";
// import sqlite3 from "sqlite3";
// import { open } from "sqlite";

import "../App.css";
//import { openDb } from "../database/Db";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.signup(name, email, password);
  };

  //const table = async () => {};

  return (
    <div className="SignUpContainer">
      <form className="SignUpForm" onSubmit={onFormSubmit}>
        <label>Enter your name :</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(txt) => setName(txt.target.value)}
          required
        />
        <br />
        <label>Enter your email :</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(txt) => setEmail(txt.target.value)}
          required
        />
        <br />
        <label>Enter your password :</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(txt) => setPassWord(txt.target.value)}
          required
        />
        <br />
        <Button type="submit" value="Submit" variant="contained">
          Create Account
        </Button>
      </form>
      <p>
        Already have an account? <Link to="/SignIn">SignIn</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    state,
  };
};
export default connect(mapStateToProps, { signup })(SignUp);
