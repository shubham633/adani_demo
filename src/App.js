import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import Admin from "./screens/Admin";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default App;
