import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { signup } from "../actions";

const Form = ({ props }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
    };

    const registerUser = () => {
        const registeredUser = props.formValue.find((item) => item.email === email);
        if (registeredUser?.email) {
            alert("This E-mail Id is already registered!");
        } else if (email === "admin@gmail.com") {
            alert("This E-mail Id is already registered!");
        } else {
            props.signup(name, email, password);
            navigate("/SignIn/Dashboard", { state: { name, email, password } });
        }
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <label style={headingStyle}> Create Your Account </label>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{ margin: "0 0 10px 0" }}>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        autoComplete="off"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={{ margin: "0 0 10px 0" }}>
                    <TextField
                        id="outlined-basic"
                        label="E-mail"
                        autoComplete="off"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div style={{ margin: "0 0 10px 0" }}>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ margin: "10px 0 10px 0" }}>
                    <Button
                        variant="contained"
                        color="warning"
                        size="medium"
                        type="submit"
                        value="submit"
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <label style={lableStyle}> Already Have An Account? </label>
                <Button
                    variant="text"
                    color="success"
                    size="medium"
                    onClick={() => navigate("/SignIn")}
                >
                    Login
                </Button>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        formValue: state.formReducer,
    };
};

const SignUp = (props) => {
    return (
        <div style={appStyle}>
            <Form props={props} />
        </div>
    );
};

const appStyle = {
    display: "flex",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
    backgroundImage: `url("https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80")`,
};

const formStyle = {
    padding: 50,
    margin: "10% 0 0 70%",
    display: "block",
    border: "1px solid #c9c9c9",
    borderRadius: "5px",
    background: "#f5f5f5",
    opacity: 0.8,
    width: "250px",
    height: "320px",
};

const headingStyle = {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 25,
    fontWeight: "bold",
    margin: "0 0 20px 0",
};

const lableStyle = {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 14,
    margin: "10px 0 0 0",
};

export default connect(mapStateToProps, { signup })(SignUp);
