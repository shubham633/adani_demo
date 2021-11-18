import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { sorting } from "../actions";
import { currentuser } from "../actions";
import { useLocation, useNavigate } from "react-router";

const Admin = (props) => {
  const [isSorted, setIsSorted] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  props.currentuser(state);
  useEffect(()=>{
    if(state===null){
      navigate('/SignIn')
    }
  })
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
          backgroundColor: "lightgray",
          margin: 2,
          marginLeft: 20,
          marginRight: 20,
        }}
        key={item.email}
      >
        <p>{item.name}</p>
        <p style={{ color: "red" }}>{item.email}</p>
      </div>
    );
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <p>Sort By</p>
        <Button
          variant="text"
          onClick={() => {
            setIsSorted(false);
          }}
        >
          default
        </Button>
        <Button
          variant="text"
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
          variant="text"
          onClick={() => {
            let emailSortingData = Object.assign([], props.userData);
            sorted(emailSortingData, "email");
            props.sorting(emailSortingData);
            setIsSorted(true);
          }}
        >
          email
        </Button>
      </div>
      <Button
        variant="text"
        size="medium"
        onClick={() => {
          props.currentuser({});
          navigate("/SignIn");
        }}
      >
        Logout
      </Button>
      <Button
        variant="text"
        size="medium"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
      {isSorted
        ? props.sortData.map((item) => userInfo(item))
        : props.userData.map((item) => userInfo(item))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.formReducer,
    sortData: state.sortReducer,
  };
};

export default connect(mapStateToProps, { sorting, currentuser })(Admin);
