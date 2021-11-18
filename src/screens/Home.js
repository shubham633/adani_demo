import React, { Component } from 'react';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.userReducer,
  };
};

function Home(props) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to Home page</p>
      <Button
        variant="text"
        color="secondary"
        size="medium"
        onClick={() => { props.user?.email && props.user?.password ? navigate('/SignIn/Dashboard', {state:props.user}) : navigate("/SignIn") }}
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
  );
}

export default connect(mapStateToProps)(Home)


