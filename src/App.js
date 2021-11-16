import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Dashboard from "./screens/Dashboard";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/SignUp", element: <SignUp /> },
    { path: "/SignIn", element: <SignIn /> },
    { path: "/SignIn/Dashboard", element: <Dashboard /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
