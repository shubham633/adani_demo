import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteUser,
  updateUser,
  currentuser,
  isUpdating,
  pagination,
  searchingTxt,
  searchUser,
} from "../actions";
import ModalComponent from "../utility/reusableComponents/ModalComponent";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Admin = (props) => {
  const [userData, setUserData] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userSalary, setUserSalary] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (props.user === null) {
      navigate("/SignIn");
    }
    props.searchTxt !== ""
      ? setUserData([...props.searchUserData])
      : setUserData([...props.userData]);
  }, [
    props.userData,
    props.user,
    navigate,
    props.searchUserData,
    props.searchTxt,
  ]);

  const sorted = (sortBy, sortOrder) => {
    userData.sort((user1, user2) => {
      let userA = user1[sortBy].toUpperCase();
      let userB = user2[sortBy].toUpperCase();
      if (sortOrder === "Ascend") {
        if (userA < userB) {
          return -1;
        }
        if (userA > userB) {
          return 1;
        }
      }
      if (sortOrder === "Descend") {
        if (userA > userB) {
          return -1;
        }
        if (userA < userB) {
          return 1;
        }
      }
      return 0;
    });
    setUserData([...userData]);
  };

  const validateUpdation = (item) => {
    if (userRole === "") {
      alert("please update role");
    } else if (userSalary === "") {
      alert("please update salary");
    } else {
      props.updateUser(item.email, userRole, userSalary);
      props.isUpdating(item.email);
      setUserRole("");
      setUserSalary("");
    }
  };

  const userInfo = (item, index) => {
    return (
      <div key={item.email}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#E8F5E9",
            margin: "15px 0 0 0",
          }}
        >
          <p style={{ color: "#616161" }}>{item.name}</p>
          <p style={{ color: "#616161" }}>{item.email}</p>
          <p style={{ color: "#616161" }}>{item.role}</p>
          <p style={{ color: "#616161" }}>{item.salary}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DeleteIcon
              color="error"
              onClick={() => {
                props.deleteUser(item.email);
              }}
            />
            <ModalComponent
              open={item.isEdit}
              closeModal={() => {
                props.isUpdating(item.email);
              }}
              email={item.email}
              openModalBtn={
                <EditIcon
                  color="primary"
                  onClick={() => {
                    props.isUpdating(item.email);
                  }}
                />
              }
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  value={userRole}
                  type="text"
                  onChange={(e) => {
                    setUserRole(e.target.value);
                  }}
                  placeholder="update role"
                />
                <TextField
                  style={{ marginTop: 10, marginBottom: 5 }}
                  value={userSalary}
                  type="number"
                  onChange={(e) => {
                    setUserSalary(e.target.value);
                  }}
                  placeholder="update salary"
                />
                <Button
                  onClick={() => {
                    validateUpdation(item);
                  }}
                >
                  update
                </Button>
              </div>
            </ModalComponent>
          </div>
        </div>
      </div>
    );
  };

  const search = (txt) => {
    const fields = ["name"];
    let arrayAfterSearch = [];
    props.userData.filter((item) =>
      fields.some((field) =>
        item[field].toUpperCase().indexOf(txt.toUpperCase()) !== -1
          ? arrayAfterSearch.push(item)
          : null
      )
    );
    props.searchUser(arrayAfterSearch);
    setUserData([...arrayAfterSearch]);
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
              props.searchTxt !== ""
                ? setUserData([...props.searchUserData])
                : setUserData([...props.userData]);
            }}
          >
            default
          </Button>

          <ArrowDownwardIcon
            style={{ marginRight: 10 }}
            variant="contained"
            onClick={() => {
              sorted("name", "Ascend");
            }}
          />
          <ArrowUpwardIcon
            style={{ marginRight: 10 }}
            variant="contained"
            onClick={() => {
              sorted("name", "Descend");
            }}
          />
          <ArrowDownwardIcon
            style={{ marginRight: 10 }}
            variant="contained"
            onClick={() => {
              sorted("email", "Ascend");
            }}
          />
          <ArrowUpwardIcon
            style={{ marginRight: 10 }}
            variant="contained"
            onClick={() => {
              sorted("email", "Descend");
            }}
          />
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
        <TextField
          value={props.searchTxt}
          placeholder="search user..."
          onChange={(e) => {
            search(e.target.value);
            props.searchingTxt(e.target.value);
          }}
          style={{ backgroundColor: "white", marginTop: 10, borderRadius: 5 }}
        />
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
          <p style={{ fontWeight: "bold", fontSize: 18 }}>Role</p>
          <p style={{ fontWeight: "bold", fontSize: 18 }}>Salary</p>
          <p style={{ fontWeight: "bold", fontSize: 18 }}>Action</p>
        </div>
        {userData.map((item, index) => userInfo(item, index))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.formReducer,
    user: state.userReducer,
    searchTxt: state.searchingTxtReducer,
    perPageData: state.pageReducer,
    searchUserData: state.searchReducer,
  };
};

const appStyle = {
  width: "100vw",
  height: "100vh",
  backgroundImage: `url("https://images.pexels.com/photos/82256/pexels-photo-82256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
};

export default connect(mapStateToProps, {
  currentuser,
  deleteUser,
  updateUser,
  isUpdating,
  pagination,
  searchingTxt,
  searchUser,
})(Admin);
