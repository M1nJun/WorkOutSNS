import { useRef, useState } from 'react';
import { processJSON, processText } from '../FetchRoutines';
import { useContext } from 'react';
import AuthContext from '../AuthContext';
import { Button, TextField,Box, Container, Typography, Grid,InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from "../logo.png";

function HomePage({setJwt}) {
  const jwt = useContext(AuthContext);
  const [showPassword,setShowPassword] = useState(false);


    function confirmLogin(jwt) {
      alert("You are logged in to your account.");
      setJwt(jwt);
    }

    function handleLogin(user) {
        fetch('http://localhost:8085/user/login', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        .then(processJSON)
        .then(confirmLogin)
        .catch(() => { alert("Login failed"); });
    }

    function handleNewAccount(user) {
      fetch('http://localhost:8085/user/create', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
          'Content-type': 'application/json; charset=UTF-8'
          }
      })
      .then(processText)
      .then(confirmLogin)
      .catch(() => {alert("Create new account failed")});
    }

    let nameInput = useRef();
    let passwordInput = useRef();

    const loginAction = (e) => { handleLogin({name:nameInput.current.value,password:passwordInput.current.value}); }
    const newAction = (e) => { handleNewAccount({name:nameInput.current.value,password:passwordInput.current.value}); }
    const handleTogglePasswordVisibility = () => {setShowPassword(!showPassword);};
    
  return (
    <div>
      {jwt ? (
        <Container maxWidth="md">
          <div>
            <PostsFeed jwt={jwt} />
            {/* The option to log out should be under account tab in the navbar */}
            <h4>Log out of your account</h4>
            <p>
              <Button variant="contained" color="primary" onClick={() => setJwt(null)}>Log Out</Button>
            </p>
          </div>
        </Container>
        ):(
    <Container maxWidth="sm">
      <Box my={4}>
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to
        </Typography>
        <Typography variant="h2" align="center" gutterBottom>
          Fit Connect
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Log in to your account
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
                type={showPassword ? 'text' : 'password'}
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
                  )
                }}
              />
            </Grid>
            <Grid item xs={4} align="center">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={loginAction}
              >
                Log In
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <Typography variant="body1">
                Do you not have an account?
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={newAction}
              >
                New Account
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
      )}
    </div> 
  )
}

export default HomePage;