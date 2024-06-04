import React from 'react';
import AuthContext from "../AuthContext";
import { useContext } from "react";
import { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { processJSON, processText } from "../FetchRoutines";
import PostsFeed from "./PostsFeed";
import {
    Button,
    TextField,
    Box,
    Container,
    Typography,
    Grid,
    InputAdornment,
    IconButton,
  } from "@mui/material";
  
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  import logo from "../logo.png";

const NewAccountPage = () => {

  const {jwt,setJwt} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    let nameInput = useRef(null);
    let passwordInput = useRef(null);

    function confirmLogin(jwt) {
        alert("You are logged in to your account.");
        setJwt(jwt);
    }

    function handleNewAccount(user) {
        fetch("http://localhost:8085/user", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then(confirmLogin)

        
      }

    const CreateNewAccount = (e) => {
        handleNewAccount({
          username: nameInput.current.value,
          password: passwordInput.current.value,
        });
      };

      //need to attach it to new account component
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <>
        {jwt ? (
        <Container maxWidth="md">
          <div>
            <PostsFeed jwt={jwt} />
          </div>
        </Container>
      ):(
        <Container maxWidth="sm">
          <Box my={1}>
            <Box display="flex" justifyContent="center" mb={2}>
              <img
                src={logo}
                alt="Logo"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to
            </Typography>
            <Typography variant="h2" align="center" gutterBottom>
              Fit Connect
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              Create Your Account
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    inputRef={nameInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    inputRef={passwordInput}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4} align="center">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={CreateNewAccount}
                  >
                    Create Your Account
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>)}
        </>
    )
}

export default NewAccountPage;