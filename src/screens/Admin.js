import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@mui/material";
import {
  sortByName,
  sortByEmail,
  deleteUser,
  updateUser,
  currentuser,
} from "../actions";
import { useNavigate } from "react-router";

const Admin = (props) => {
  const [isSorted, setIsSorted] = useState(false);
  // const [sortData, setSortData] = useState(null);
  // const [searchUser, setSearchUser] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   setSortData(props.userData);
  // });
  console.log(props);
  useEffect(() => {
    if (props.user === null) {
      navigate("/SignIn");
    }
  });
  // localStorage.setItem("userInfo", "formReducer");
  // console.log(localStorage.getItem("userInfo"));
  const sorted = (sortBy) => {
    sortBy === "name"
      ? props.userData.sort((userA, userB) => {
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
      : props.userData.sort((userA, userB) => {
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

  const userInfo = (item, index) => {
    //console.log(item);
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
        <Button onClick={() => props.deleteUser(index)}>Delete</Button>
        <Button onClick={() => props.updateUser(index)}>Edit</Button>
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
              //let nameSortingData =props.userData
              let nameSort = sorted("name");
              console.log(nameSort);
              props.sortByName(props.userData);
              // setSortData();
              setIsSorted(true);
            }}
          >
            name
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // Object.assign([], props.userData);
              // let emailSortingData = props.userData;
              let emailSort = sorted("email");

              props.sortByEmail(props.userData);
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
          <p style={{ fontWeight: "bold", fontSize: 18 }}>Delete</p>
          <p style={{ fontWeight: "bold", fontSize: 18 }}>Edit</p>
        </div>
        {props.userData.map((item, index) => userInfo(item, index))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.formReducer,
   // sortData: state.sortReducer,
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

export default connect(mapStateToProps, {
  sortByName,
  sortByEmail,
  currentuser,
  deleteUser,
  updateUser,
})(Admin);
