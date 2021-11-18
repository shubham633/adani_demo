import React, { useState } from "react";
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
          marginLeft:20,
          marginRight:20
        }}
      >
        <p key={item.name}>{item.name}</p>
        <p key={item.email} style={{ color: "red" }}>
          {item.email}
        </p>
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
          navigate("/");
        }}
      >
        Logout
      </Button>
      {isSorted
        ? props.sortData.map((item) => userInfo(item))
        : props.userData.map((item) => userInfo(item))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userData: state.formReducer, sortData: state.sortReducer , currentuserData:state.userReducer};
};

export default connect(mapStateToProps, { sorting, currentuser })(Admin);
