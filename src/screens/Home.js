import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { connect } from "react-redux";
import { signin } from "../actions";

const Form = ({ props }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (
      props.formReducer.email === email &&
      props.formReducer.password === password
    ) {
      navigate("./Home/Dashboard");
      console.log("User SignedIn");
    }
    else {
      alert("Credentials are Invalid!!")
    }
  };
  return (
    <form style={formStyle} onSubmit={handleSubmit} >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label style={headingStyle}> Welcome!</label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: '0 0 10px 0' }}>
          <TextField id="outlined-required" label="Enter Email Address" required autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ margin: '0 0 10px 0' }}>
          <TextField id="outlined-password-input" label="Enter Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="text" color="success" size="medium" type="submit" >Login</Button>
        <Button variant="text" color="secondary" size="medium" onClick={() => navigate('/Signup')}>SignUp</Button>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => {
  console.log(state)
  return state
};

const Home = (props) => {
  console.log(props)
  return (
    <div style={appStyle}>
      <Form props={props} />
    </div>
  );
};

const appStyle = {
  display: 'flex',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100vw',
  height: '100vh',
  backgroundImage: `url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80")`
};

const formStyle = {
  padding: 50,
  margin: '10% 0 0 5%',
  display: 'block'
};

const headingStyle = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: 25,
  fontWeight: 'bold',
  margin: '0 0 20px 0'
};

export default connect(mapStateToProps, { signin })(Home);
