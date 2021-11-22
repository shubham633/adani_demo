import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { sorting } from "../actions";
import { currentuser } from "../actions";
import { useNavigate } from "react-router";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ListIcon from '@mui/icons-material/List';
import BuildIcon from '@mui/icons-material/Build';

const drawerWidth = 240;

const Admin = (props) => {

  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(true);

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
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} >
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
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
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
  const [isSorted, setIsSorted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.user === null) {
      navigate("/SignIn");
    }
  });
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
      <div style={{ paddingLeft: '16%', paddingRight: 15, paddingTop: 20 }}>
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
};


export default connect(mapStateToProps, { currentuser, sorting })(Admin);


// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import ListItemButton from '@mui/material/ListItemButton';
// import Collapse from '@mui/material/Collapse';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import ListIcon from '@mui/icons-material/List';
// import BuildIcon from '@mui/icons-material/Build';
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router";

// const drawerWidth = 240;

// function Admin(props) {
//   const navigate = useNavigate();
//   const [open, setOpen] = React.useState(true);
//   const [open1, setOpen1] = React.useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };
//   const handleClick1 = () => {
//     setOpen1(!open1);
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         <ListItemButton onClick={handleClick}>
//           <ListItemIcon>
//             <PersonOutlineIcon />
//           </ListItemIcon>
//           <ListItemText primary="Users" />
//           {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton sx={{ pl: 4 }} >
//               <ListItemIcon>
//                 <ListIcon />
//               </ListItemIcon>
//               <ListItemText primary="List" />
//             </ListItemButton>
//           </List>
//         </Collapse>
//       </List>
//       <Divider />
//       <List>
//         <ListItemButton onClick={handleClick1}>
//           <ListItemIcon>
//             <BuildIcon />
//           </ListItemIcon>
//           <ListItemText primary="Tools" />
//           {open ? <ExpandLess /> : <ExpandMore />}
//         </ListItemButton>
//         <Collapse in={open1} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton sx={{ pl: 4 }}>
//               <ListItemIcon>
//                 <StarBorder />
//               </ListItemIcon>
//               <ListItemText primary="Starred" />
//             </ListItemButton>
//           </List>
//         </Collapse>
//       </List>
//     </div>
//   );

//   return (
//     <Box component="main" sx={{ display: 'flex' }}>
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: 'none', sm: 'block' },
//           '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//         }}
//         open
//       >
//         {drawer}
//       </Drawer>
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Welcome back, Admin!
//           </Typography>
//           <div style={{ marginLeft: '69%' }}>
//             <Button
//               style={{ marginLeft: 20 }}
//               variant="contained"
//               color={"success"}
//               onClick={() => {
//                 navigate("/");
//               }}
//             >
//               Home
//             </Button>
//             <Button
//               style={{ marginLeft: 10 }}
//               variant="contained"
//               color={"error"}
//             // onClick={() => {
//             //   props.currentuser(null);
//             //   navigate("/SignIn");
//             // }}
//             >
//               Logout
//             </Button>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"

//       >
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//     </Box>
//   );
// }

// export default Admin;
