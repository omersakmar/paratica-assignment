import {
  AppBar,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth-service";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f1f3f5",
    },
    secondary: {
      main: "#0000FE",
    },
  },
});

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const admin = authService.getCurrentRole();

    if (admin) {
      setIsAdmin(true);
    }
  }, []);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    authService.logout();
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, mb: 5 }}>
        <AppBar position="static">
          <Toolbar>
            <Box
              component="img"
              sx={{
                mr: 2,
                height: 100,
                width: 100,
                maxHeight: { xs: 100, md: 85 },
                maxWidth: { xs: 100, md: 85 },
              }}
              src="https://cdn.paratica.com/assets/home/img/logo.svg"
            />
            {!currentUser && (
              <Link to="/login">
                <IconButton
                  sx={{ fontSize: { lg: 25, md: 20, sm: 15, xs: 13 } }}
                  color="secondary"
                >
                  Log in
                </IconButton>
              </Link>
            )}
            {currentUser && (
              <Link to="/trending">
                <IconButton
                  sx={{ fontSize: { lg: 25, md: 20, sm: 15, xs: 13 } }}
                  color="secondary"
                >
                  Trending
                </IconButton>
              </Link>
            )}
            {isAdmin && (
              <Link to="/categories">
                <IconButton
                  sx={{ fontSize: { lg: 25, md: 20, sm: 15, xs: 13 } }}
                  color="secondary"
                >
                  Categories
                </IconButton>
              </Link>
            )}
            {currentUser && (
              <a href="/login" onClick={logOut}>
                <IconButton
                  sx={{ fontSize: { lg: 25, md: 20, sm: 15, xs: 13 } }}
                  color="secondary"
                >
                  Logout
                </IconButton>
              </a>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;
