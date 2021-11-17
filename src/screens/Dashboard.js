import React from 'react';
import Pagination from '@mui/material/Pagination';

const Dashboard = () => {
    return (
        <div style={appStyle}>
            <div>
                <label style={headingStyle}>Dashboard</label>
                {/* <Pagination count={10} /> */}
            </div>
        </div>
    );
}

const appStyle = {
    display: 'flex',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh'
};

const headingStyle = {
    fontSize: 20,
    fontWeight: 'bold'
};

export default Dashboard;