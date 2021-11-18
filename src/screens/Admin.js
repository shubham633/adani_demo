import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { sortByName } from "../actions";

const Admin = (props) => {
  const [isSorted, setIsSorted] = useState(false);
  const sortName = (sortingData) => {
    console.log('sorted')
    sortingData.sort((userA, userB) => {
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
      {isSorted
        ? props.sortData.map((item) => <p key={item.email}>{item.name}</p>)
        : props.userData.map((item) => <p key={item.email}>{item.name}</p>)}
      <Button
        variant="contained"
        onClick={() => {
          let sortingData=Object.assign([], props.userData)
          sortName(sortingData);
          props.sortByName(sortingData);
          setIsSorted(!isSorted);
        }}
      >
        Sort By Name
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userData: state.formReducer, sortData: state.sortReducer };
};

export default connect(mapStateToProps, { sortByName })(Admin);
