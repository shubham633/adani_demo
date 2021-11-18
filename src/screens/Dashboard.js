import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { connect } from "react-redux";
import { currentuser } from "../actions";
import Button from "@mui/material/Button";

const Container = ({ props }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    return (
        <div style={{ padding: 20 }}>
            <div style={headingContainer}>
                <label style={headingStyle}>Welcome!</label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={userdata}> Username:</label>
                    <label style={userdata}> E-mail Address:</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 40 }}>
                    <label style={uservalue}>{state !== null ? state.name : null}</label>
                    <label style={uservalue}>{state !== null ? state.email : null}</label>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -325 }}>
                <Button
                    color={'success'}
                    variant="contained"
                    size="medium"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Home
                </Button>
                <Button
                    style={{ marginLeft: 10 }}
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={() => {
                        props.currentuser({});
                        navigate("/SignIn");
                    }}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

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
        <div style={appStyle}>
            <Container props={props} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return state
};
export default connect(mapStateToProps, { currentuser })(Dashboard);

const appStyle = {
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
    backgroundImage: `url("https://images.pexels.com/photos/1040499/pexels-photo-1040499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`
};

const headingContainer = {
    display: 'flex',
    justifyContent: 'center'
};

const headingStyle = {
    fontSize: 40,
    color: '#fff',
    fontWeight: "bold",
};

const userdata = {
    fontSize: 20,
    color: '#78909C',
    fontWeight: "bold",
    lineHeight: 3
};

const uservalue = {
    fontSize: 20,
    color: '#fff',
    fontWeight: "bold",
    lineHeight: 3
};