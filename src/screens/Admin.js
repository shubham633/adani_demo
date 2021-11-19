// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { Button } from "@mui/material";
// import { sorting } from "../actions";
// import { currentuser } from "../actions";
// import { useLocation, useNavigate } from "react-router";

// const Admin = (props) => {
//   const [isSorted, setIsSorted] = useState(false);
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   props.currentuser(state);
//   useEffect(() => {
//     if (state === null) {
//       navigate('/SignIn')
//     }
//   })
//   const sorted = (sortingData, sortBy) => {
//     sortBy === "name"
//       ? sortingData.sort((userA, userB) => {
//         var nameA = userA.name.toUpperCase();
//         var nameB = userB.name.toUpperCase();
//         if (nameA < nameB) {
//           return -1;
//         }
//         if (nameA > nameB) {
//           return 1;
//         }
//         return 0;
//       })
//       : sortingData.sort((userA, userB) => {
//         var emailA = userA.email.toUpperCase();
//         var emailB = userB.email.toUpperCase();
//         if (emailA < emailB) {
//           return -1;
//         }
//         if (emailA > emailB) {
//           return 1;
//         }
//         return 0;
//       });
//   };

//   const userInfo = (item) => {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           backgroundColor: "#E8F5E9",
//           margin: '15px 0 0 0'
//         }}
//         key={item.email}
//       >
//         <p style={{ color: '#616161' }}>{item.name}</p>
//         <p style={{ color: "#616161" }}>
//           {item.email}
//         </p>
//       </div>
//     );
//   };
//   return (
//     <div style={appStyle}>
//       <div style={{ padding: 20 }}>
//         <div style={{ flexDirection: 'row' }}>
//           <label style={{ fontSize: 22, fontWeight: "bold", }}>Sort By: </label>
//           <Button
//             style={{ marginRight: 10 }}
//             variant="contained"
//             onClick={() => {
//               setIsSorted(false);
//             }}
//           >
//             default
//           </Button>
//           <Button
//             style={{ marginRight: 10 }}
//             variant="contained"
//             onClick={() => {
//               let nameSortingData = Object.assign([], props.userData);
//               sorted(nameSortingData, "name");
//               props.sorting(nameSortingData);
//               setIsSorted(true);
//             }}
//           >
//             name
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => {
//               let emailSortingData = Object.assign([], props.userData);
//               sorted(emailSortingData, "email");
//               props.sorting(emailSortingData);
//               setIsSorted(true);
//             }}
//           >
//             e-mail
//           </Button>
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -40 }}>
//             <Button
//               variant="contained"
//               color={'success'}
//               onClick={() => {
//                 navigate("/");
//               }}
//             >
//               Home
//             </Button>
//             <Button
//               style={{ marginLeft: 10 }}
//               variant="contained"
//               color={'error'}
//               onClick={() => {
//                 props.currentuser({});
//                 navigate("/SignIn");
//               }}
//             >
//               Logout
//             </Button>
//           </div>
//         </div>
//         <div style={{
//           display: "flex",
//           justifyContent: "space-around",
//           backgroundColor: "#E8F5E9",
//           margin: '15px 0 0 0'
//         }}>
//           <p style={{ fontWeight: 'bold', fontSize: 18 }}>User Name</p>
//           <p style={{ fontWeight: 'bold', fontSize: 18 }}>User E-mail</p>
//         </div>
//         {isSorted
//           ? props.sortData.map((item) => userInfo(item))
//           : props.userData.map((item) => userInfo(item))}
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     userData: state.formReducer,
//     sortData: state.sortReducer,
//   };
// };

// const appStyle = {
//   backgroundPosition: "center",
//   backgroundSize: "cover",
//   width: "100vw",
//   height: "100vh",
//   backgroundImage: `url("https://images.pexels.com/photos/82256/pexels-photo-82256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`
// };

// export default connect(mapStateToProps, { sorting, currentuser })(Admin);

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BuildIcon from '@mui/icons-material/Build';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';

const drawerWidth = 240;

function Admin(props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const [open1, setOpen1] = React.useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
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
          {open1 ? <ExpandLess /> : <ExpandMore />}
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
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
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

Admin.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Admin;

