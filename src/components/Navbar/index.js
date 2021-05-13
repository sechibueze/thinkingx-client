import { useState } from "react";
// import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./navbar.module.css";
import {
  AppBar,
  // Button,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@material-ui/core";
// import {  MoreVert } from "@material-ui/core";

import {
  Menu as MenuIcon,
  MoreVert,
  Dashboard,
  Mail,
  ChevronLeft as ChevronLeftIcon,
} from "@material-ui/icons";
import Logo from "../Logo";

const useStyles = makeStyles((theme) => ({
  rootr: {
    backgroundColor: "thistle",
  },
  toolBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toolBarLeft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  toolBarRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    "& a": {
      padding: "0rem .25rem",
    },
    menuIcon: {
      margin: "0rem 0rem 5rem 0rem",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const { currentUser, logout } = useAuthContext();
  const [menuElementLocation, setMenuElementLocation] = useState();
  const [open, setOpen] = useState(false);
  function setMenuEl(e) {
    // console.log("efef", e.currentTarget);
    // The the menu to display at the position of the three dots
    setMenuElementLocation(e.currentTarget);
  }
  function closeMenu() {
    setMenuElementLocation(null);
  }
  function closeAndLogout() {
    closeMenu();
    setOpen(false);
    logout();
  }

  const GuestMenu = () => (
    <Menu
      id="guest-menu"
      anchorEl={menuElementLocation}
      open={menuElementLocation ? true : false}
      keepMounted
      onClose={closeMenu}
    >
      <MenuItem component="a" href="/signup">
        <Typography variant="body1" noWrap>
          Signup
        </Typography>
      </MenuItem>
      <MenuItem component="a" href="/login">
        <Typography variant="body1" noWrap>
          Log in
        </Typography>
      </MenuItem>
    </Menu>
  );

  const SideDrawer = () => (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
      <List component="sidebar" dense={false}>
        <header className={styles.sidebarHeader}>
          <Logo showProjectName />
          <ChevronLeftIcon onClick={() => setOpen(false)} />
        </header>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>

          <ListItemText primary="Send mail" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => closeAndLogout()}>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>

          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </Drawer>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="sticky" color="secondary" className={classes.rootr}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.toolBarLeft}>
            <SideDrawer />
            {currentUser && (
              <MenuIcon
                onClick={() => setOpen(true)}
                style={{ marginRight: ".5rem" }}
              />
            )}
            <Logo showProjectName />
          </div>
          <div className={classes.toolBarRight}>
            {/* <Link to="/todos">Projecst</Link>
            <Link to="/todos">Todos</Link> */}
            <MoreVert onClick={setMenuEl} />
            {currentUser && (
              <>
                <Divider orientation="vertical" />
                <Avatar>SC</Avatar>
              </>
            )}
            <GuestMenu />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
