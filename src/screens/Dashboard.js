import React from "react";
import { useLocation, useNavigate } from "react-router";
import { connect } from "react-redux";
import { currentuser } from "../actions";
import Button from "@mui/material/Button";

const Dashboard = (props) => {
  const { state } = useLocation();
  const { name, email } = state;
  const navigate = useNavigate();
  props.currentuser(state);
  return (
    <div>
      <p>{email}</p>
      <p>Welcome {name} to my app</p>
      <Button
        variant="text"
        size="medium"
        onClick={() => {
          props.currentuser({});
          navigate("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.userReducer;
};
export default connect(mapStateToProps, { currentuser })(Dashboard);

const appStyle = {
  display: "flex",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100vw",
  height: "100vh",
};

const headingStyle = {
  fontSize: 20,
  fontWeight: "bold",
};
