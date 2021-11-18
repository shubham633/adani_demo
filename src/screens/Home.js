import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

function Home(props) {
  const navigate = useNavigate();
  const checkLogin = () => {
    if (
      props.user?.email === "admin@gmail.com" &&
      props.user?.password === "admin1234"
    ) {
      navigate("/SignIn/Admin", { state: props.user });
    } else if (props.user?.email && props.user?.password) {
      navigate("/SignIn/Dashboard", { state: props.user });
    } else {
      navigate("/SignIn");
    }
  };
  return (
    <div style={appStyle}>
      <div style={formStyle}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '12%' }}>
          <div style={{ paddingRight: 40 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                checkLogin();
              }}
            >
              {props.user?.email && props.user?.password
                ? "Go to Dashboard"
                : "Login"}
            </Button>
          </div>
          <div>
            {props.user?.email && props.user?.password ? null : (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate("/SignUp")}
              >
                SignUp
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const appStyle = {
  display: 'flex',
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100vw",
  height: "100vh",
  backgroundImage: `url("https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`
};

const formStyle = {
  border: "1px",
  borderRadius: "5px",
  background: "#A1887F",
  opacity: 0.8,
  width: "320px",
  height: "120px",
  marginTop: '18%',
  marginLeft: '8%'
};

const headingStyle = {
  fontSize: 40,
  color: '#fff',
  fontWeight: "bold",
};

export default connect(mapStateToProps)(Home);
