import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { sorting } from "../actions";
import { currentuser } from "../actions";
import { useNavigate } from "react-router";

const Admin = (props) => {
  const [isSorted, setIsSorted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate("/SignIn");
    }
  },[navigate]);
  const sorted = (sortingData, sortBy) => {
    sortBy === "name"
      ? sortingData.sort((userA, userB) => {
          var nameA = userA.name.toUpperCase();
          var nameB = userB.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
      : sortingData.sort((userA, userB) => {
          var emailA = userA.email.toUpperCase();
          var emailB = userB.email.toUpperCase();
          if (emailA < emailB) {
            return -1;
          }
          if (emailA > emailB) {
            return 1;
          }
          return 0;
        });
  };

  const userInfo = (item) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#E8F5E9",
          margin: "15px 0 0 0",
        }}
        key={item.email}
      >
        <p style={{ color: "#616161" }}>{item.name}</p>
        <p style={{ color: "#616161" }}>{item.email}</p>
      </div>
    );
  };
  return (
    <div style={appStyle}>
      <div style={{ padding: 20 }}>
        <div style={{ flexDirection: "row" }}>
          <label style={{ fontSize: 22, fontWeight: "bold" }}>Sort By: </label>
          <Button
            style={{ marginRight: 10 }}
            variant="contained"
            onClick={() => {
              setIsSorted(false);
            }}
          >
            default
          </Button>
          <Button
            style={{ marginRight: 10 }}
            variant="contained"
            onClick={() => {
              let nameSortingData = Object.assign([], props.userData);
              sorted(nameSortingData, "name");
              props.sorting(nameSortingData);
              setIsSorted(true);
            }}
          >
            name
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              let emailSortingData = Object.assign([], props.userData);
              sorted(emailSortingData, "email");
              props.sorting(emailSortingData);
              setIsSorted(true);
            }}
          >
            e-mail
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: -40,
            }}
          >
            <Button
              variant="contained"
              color={"success"}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              variant="contained"
              color={"error"}
              onClick={() => {
                props.currentuser(null);
                localStorage.removeItem('user');
                navigate("/SignIn");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#E8F5E9",
            margin: "15px 0 0 0",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: 18 }}>User Name</p>
          <p style={{ fontWeight: "bold", fontSize: 18 }}>User E-mail</p>
        </div>
        {isSorted
          ? props.sortData.map((item) => userInfo(item))
          : props.userData.map((item) => userInfo(item))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.formReducer,
    sortData: state.sortReducer,
    user: state.userReducer,
  };
};

const appStyle = {
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100vw",
  height: "100vh",
  backgroundImage: `url("https://images.pexels.com/photos/82256/pexels-photo-82256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
};

export default connect(mapStateToProps, { sorting, currentuser })(Admin);
