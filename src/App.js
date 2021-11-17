import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import SignUp from './screens/SignUp';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Home/Dashboard' element={<Dashboard />} />
                <Route path='/SignUp' element={<SignUp />} />
            </Routes>
        </Router>
    );
};
export default App;