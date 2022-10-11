import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import Paratica from "../images/paratica.png";
import { Box, Container, createTheme } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import authService from "../services/auth-service";

const theme = createTheme();

const Login = () => {
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    try {
      await authService.login(username, password).then(
        () => {
          navigate("/trending");
          window.location.reload();
        },
        (error) => {
          console.log(error);
          setIsError(true);
        }
      );
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ bgcolor: "primary.main" }}
            alt="paratica-logo"
            src={Paratica}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              type="password"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              tpye="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign in
            </Button>

            {isError && (
              <Typography>Invalid username and/or password.</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
