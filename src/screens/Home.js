import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

function Home(props) {
  const navigate = useNavigate();
  const checkLogin = () => {
    if (
      props.user?.email === "admin@gmail.com" &&
      props.user?.password === "admin1234"
    ) {
      navigate("/SignIn/Admin", { state: props.user });
    } else if (props.user?.email && props.user?.password) {
      navigate("/SignIn/Dashboard", { state: props.user });
    } else {
      navigate("/SignIn");
    }
  };
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to Home page</p>
      <Button
        variant="text"
        color="secondary"
        size="medium"
        onClick={() => {
          checkLogin();
        }}
      >
        {props.user?.email && props.user?.password
          ? "Go to Dashboard"
          : "Login"}
      </Button>
      {props.user?.email && props.user?.password ? null : (
        <Button
          variant="text"
          color="secondary"
          size="medium"
          onClick={() => navigate("/SignUp")}
        >
          SignUp
        </Button>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Home);
