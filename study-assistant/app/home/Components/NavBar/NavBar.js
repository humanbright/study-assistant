import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AdbIcon from "@mui/icons-material/Adb";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const pages = ["Home", "Chat", "About"];

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [login, setLogin] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setLogin(!login);
  };

  return (
    <Box position={"relative"}>
      <AppBar
        position="sticky"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: "10vh",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <Icon
          sx={{
            size: "large",
            edge: "start",
            color: "white",
            ml: "1em",
            mr: "0.5em",
          }}
        >
          <AdbIcon />
        </Icon>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: "2em",
          }}
        >
          Study Buddy
        </Typography>
        {pages.map((page) => (
          <Link href={`/${page.toLowerCase()}`}>
            <Button
              variant="text"
              sx={{
                color: "white",
                fontSize: "1em",
              }}
            >
              {page}
            </Button>
          </Link>
        ))}
        <Avatar
          alt="user"
          sx={{
            mr: "1em",
            ml: "1.5em",
          }}
        >
          <IconButton onClick={handleClick}>
            <AccountCircleIcon fontSize="xl" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {login ? (
              <div>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <IconButton>
                      <Settings />
                    </IconButton>
                  </ListItemIcon>
                  <Typography variant="inherit">Settings</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  <ListItemIcon>
                    <IconButton>
                      <LogoutIcon />
                    </IconButton>
                  </ListItemIcon>
                  <Typography variant="inherit">Logout</Typography>
                </MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  <ListItemIcon>
                    <IconButton>
                      <LoginIcon />
                    </IconButton>
                  </ListItemIcon>
                  <Typography variant="inherit">Login</Typography>
                </MenuItem>
              </div>
            )}
          </Menu>
        </Avatar>
      </AppBar>
    </Box>
  );
}
