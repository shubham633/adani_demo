import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="SignUp">SignUp</Link>
        </li>
        <li>
          <Link to="SignIn">SignIn</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
