import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import Admin from "./screens/Admin";
import Home from "./screens/Home";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignIn/Dashboard" element={<Dashboard />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/SignIn/Admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default App;
