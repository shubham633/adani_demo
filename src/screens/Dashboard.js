import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function Dashboard(props) {
  const { state } = useLocation();
  const { name, email } = state;
  return (
    <div>
      <p>{email}</p>
      <p>Welcome {name} to my app</p>
      <Link to="./SignIn">Logout</Link>
    </div>
  );
}

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
