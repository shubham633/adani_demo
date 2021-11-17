import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";

const Admin = (props) => {
  const [isSorted, setIsSorted] = useState(false);
  const [userInfo, setUserInfo] = useState(props.userData);
  const sortName = () => {
    userInfo.sort((userA, userB) => {
      var nameA = userA.name.toUpperCase();
      var nameB = userB.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <div>
      {userInfo.map((item) => (
        <p key={item.email}>{item.name}</p>
      ))}
      <Button
        variant="contained"
        onClick={() => {
          sortName();
          setIsSorted(true);
          setUserInfo(userInfo);
        }}
      >
        Sort By Name
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userData: state.formReducer };
};

export default connect(mapStateToProps)(Admin);
