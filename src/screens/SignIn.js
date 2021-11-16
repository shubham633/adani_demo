import React, { useState } from "react";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import { signin } from "../actions";
import "../App.css";
import { useNavigate } from "react-router";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (
      props.formValue.email === email &&
      props.formValue.password === password
    ) {
      navigate("/SignIn/Dashboard");
      console.log("user signin");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="SignUpContainer">
      <form className="SignUpForm" onSubmit={onFormSubmit}>
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
          signin
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formValue: state.formReducer,
  };
};
export default connect(mapStateToProps, { signin })(SignIn);
