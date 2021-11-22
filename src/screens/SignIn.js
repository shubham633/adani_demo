import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { currentuser } from "../actions";

const Form = ({ props, navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    userValidation();
  };

  const userValidation = () => {
    const validUser = props.formValue.find(
      (item) => item.email === email && item.password === password
    );
    if (validUser?.email && validUser?.password) {
      props.currentuser(validUser);
      navigate("/SignIn/Dashboard");
    } else if (email === "admin@gmail.com" && password === "admin1234") {
      props.currentuser({ email, password });
      navigate("/SignIn/Admin");
    } else {
      alert("Please enter a valid E-mail Id or Password!");
    }
  };
  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <label style={headingStyle}> Welcome!</label>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ margin: "0 0 10px 0" }}>
          <TextField
            id="outlined-required"
            label="Enter E-mail Address"
            type="email"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ margin: "0 0 10px 0" }}>
          <TextField
            id="outlined-password-input"
            label="Enter Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="text"
          color="success"
          size="medium"
          type="submit"
          value="submit"
        >
          Login
        </Button>
        <Button
          variant="text"
          color="secondary"
          size="medium"
          onClick={() => navigate("/SignUp")}
        >
          SignUp
        </Button>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    formValue: state.formReducer,
    user: state.userReducer,
  };
};

const SignIn = (props) => {
  const navigate = useNavigate();
  return (
    <div style={appStyle}>
      <Form props={props} navigate={navigate} />
    </div>
  );
};

const appStyle = {
  display: "flex",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100vw",
  height: "100vh",
  backgroundImage: `url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80")`,
};

const formStyle = {
  padding: 50,
  margin: "10% 0 0 5%",
  display: "block",
};

const headingStyle = {
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: 25,
  fontWeight: "bold",
  margin: "0 0 20px 0",
};

export default connect(mapStateToProps, { currentuser })(SignIn);
