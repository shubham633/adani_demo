import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { connect } from "react-redux";
import { currentuser } from "../actions";
import Button from "@mui/material/Button";

const Dashboard = (props) => {
  const { state } = useLocation();
  useEffect(() => {
    if (state === null) {
      navigate("/SignIn");
    }
  });
  const navigate = useNavigate();
  props.currentuser(state);
  return (
    <div>
      <p>{state!==null?state.name:null}</p>
      <p>Welcome {state!==null?state.email:null} to my app</p>
      <Button
        variant="text"
        size="medium"
        onClick={() => {
          props.currentuser({});
          navigate("/SignIn");
        }}
      >
        Logout
      </Button>
      <Button
        variant="text"
        size="medium"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { currentuser })(Dashboard);

