import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ListIcon from '@mui/icons-material/List';
import BuildIcon from '@mui/icons-material/Build';
import AppBar from '@mui/material/AppBar';
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
import Cards from './Cards';

const drawerWidth = 240;

const Admin = (props) => {
  const [userData, setUserData] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userSalary, setUserSalary] = useState("");
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const [showList, setshowList] = useState(false);

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
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
          {!open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => setshowList(!showList)} >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="List" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleClick1}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Tools" />
          {!open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

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
      alert("Please update role!");
    } else if (userSalary === "") {
      alert("Please update salary!");
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
            backgroundColor: "white",
            margin: "15px 0 0 0",
            flexDirection: 'row',
            paddingLeft: 50,
            paddingRight: 50
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-start', flex: 1 }}>
            <p style={{ color: "#616161" }}>{item.name}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <p style={{ color: "#616161" }}>{item.email}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <p style={{ color: "#616161" }}>{item.role}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <p style={{ color: "#616161" }}>{item.salary}</p>
          </div>
          <div style={{ display: "flex", justifyContent: 'flex-end', flex: 1, alignItems: "center" }}>
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
                  placeholder="Update Role"
                />
                <TextField
                  style={{ marginTop: 10, marginBottom: 5 }}
                  value={userSalary}
                  type="number"
                  onChange={(e) => {
                    setUserSalary(e.target.value);
                  }}
                  placeholder="Update Salary"
                />
                <Button
                  onClick={() => {
                    validateUpdation(item);
                  }}
                >
                  Update
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
      <div>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </div>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Welcome back, Admin!
          </Typography>
          <div
            style={{
              marginLeft: '69%'
            }}
          >
            <Button
              style={{ marginLeft: 20 }}
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
        </Toolbar>
      </AppBar>
      {!showList &&
        <div style={{ marginLeft: '20%', marginTop: '12%', flexDirection: 'row', display: 'flex' }}>
          <div style={{ flex: 1, marginRight: 80 }}>
            <Cards image="https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
          </div>
          <div style={{ flex: 1, marginRight: 80 }}>
            <Cards image="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
          </div>
          <div style={{ flex: 1 }}>
            <Cards image="https://images.pexels.com/photos/251225/pexels-photo-251225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
          </div>
        </div>
      }
      {showList && <div style={{ marginLeft: '10%', flex: 1, marginTop: '6%', paddingLeft: 95, paddingRight: 15 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <TextField
              value={props.searchTxt}
              placeholder="Search User..."
              onChange={(e) => {
                search(e.target.value);
                props.searchingTxt(e.target.value);
              }}
              style={{ backgroundColor: "white", marginTop: 10, borderRadius: 5 }}
            />
          </div>
          <div style={{ marginTop: 20, justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
            <label style={{ fontSize: 20, fontWeight: "bold", marginTop: -5 }}>Sort By: </label>
            <Button
              style={{ marginRight: 10, marginLeft: 10 }}
              variant="contained"
              size={'small'}
              onClick={() => {
                props.searchTxt !== ""
                  ? setUserData([...props.searchUserData])
                  : setUserData([...props.userData]);
              }}
            >
              default
            </Button>
            <div style={{
              display: "flex",
              border: "1px solid #9E9E9E",
              borderRadius: "5px",
              width: "112px",
              height: "28px",
              alignItems: 'center',
              flexDirection: 'row',
              marginRight: 10
            }}>
              <div style={{ marginLeft: 5 }}>
                <lable style={{ fontSize: 18, marginRight: 5 }}>Name:</lable>
              </div>
              <div style={{ display: 'flex' }}>
                <ArrowDownwardIcon
                  variant="contained"
                  onClick={() => {
                    sorted("name", "Ascend");
                  }}
                />
                <ArrowUpwardIcon
                  variant="contained"
                  onClick={() => {
                    sorted("name", "Descend");
                  }}
                />
              </div>
            </div>
            <div style={{
              display: "flex",
              border: "1px solid #9E9E9E",
              borderRadius: "5px",
              width: "112px",
              height: "28px",
              alignItems: 'center',
              flexDirection: 'row'
            }}>
              <div style={{ marginLeft: 5 }}>
                <lable style={{ fontSize: 18, marginRight: 5 }}>E-mail:</lable>
              </div>
              <div style={{ display: 'flex' }}>
                <ArrowDownwardIcon
                  variant="contained"
                  onClick={() => {
                    sorted("email", "Ascend");
                  }}
                />
                <ArrowUpwardIcon
                  variant="contained"
                  onClick={() => {
                    sorted("email", "Descend");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "white",
            margin: "15px 0 0 0",
            flexDirection: 'row',
            paddingLeft: 50,
            paddingRight: 50
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-start', flex: 1 }}>
            <p style={{ fontWeight: "bold", fontSize: 18 }}>User Name</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <p style={{ fontWeight: "bold", fontSize: 18 }}>User E-mail</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <p style={{ fontWeight: "bold", fontSize: 18 }}>Role</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <p style={{ fontWeight: "bold", fontSize: 18 }}>Salary</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
            <p style={{ fontWeight: "bold", fontSize: 18 }}>Action</p>
          </div>
        </div>
        {userData.map((item, index) => userInfo(item, index))}
      </div>}
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
  display: 'flex',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundColor: '#EEEEEE',
  width: "100vw",
  height: "100vh",
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
