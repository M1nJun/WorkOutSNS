import { useState,useRef,useEffect,useContext } from "react";
import AuthContext from "../AuthContext";
import { silentJSON, processAlert } from "../FetchRoutines";
import { Button, TextField,Box, Container, Typography, Grid,InputAdornment, IconButton } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import logo from "../logo.png";

function ProfilePage() {
    useEffect(() => {getProfile()},[]);
    
    let firstNameInput = useRef();
    let lastNameInput = useRef();
    let emailInput = useRef();
    let bioInput = useRef();

    const jwt = useContext(AuthContext);
    const [profile,setProfile] = useState();
    

    function getProfile() {
        const headers = {"Authorization" : "Bearer "+jwt};
        fetch("http://localhost:8085/profile/user", {method:"GET",headers:headers}).then(silentJSON)
        .then(response=>{setProfile(response)});
    }
    function updateProfile() {
        const headers = {"Authorization" : "Bearer "+jwt,"Content-type" : "application/json; charset=UTF-8"};
        const toPost = {firstname:firstNameInput.current.value, lastname:lastNameInput.current.value, email:emailInput.current.value, bio:bioInput.current.value};
        fetch("http://localhost:8085/profile", {
            method: "POST",
            body: JSON.stringify(toPost),
            headers: headers
        }).then(response => processAlert(response,"Profile updated."));
    }
    function createProfile() {
        const headers = {"Authorization" : "Bearer "+jwt,"Content-type" : "application/json; charset=UTF-8"};
        const toPost = {firstname:firstNameInput.current.value, lastname:lastNameInput.current.value, email:emailInput.current.value, bio:bioInput.current.value};
        fetch("http://localhost:8085/profile", {
            method: "POST",
            body: JSON.stringify(toPost),
            headers: headers
        }).then(response => processAlert(response,"Profile created."));
    }

    function handleLogout() {
        alert("You are logged out of your account.");
        setJwt('');
    }

    if(jwt.length == 0)
        return (
            <p>You are not logged in to your account.</p>
        );
    else if(profile)
        return (
            <Container maxWidth="sm">
                <Box my={4}>
                    <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '20%', height: 'auto' }} />
                    </Box>
                    <Typography variant="h3" align="center" gutterBottom>
                    Update Your Profile
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                inputRef={firstNameInput}
                                defaultValue= {profile.firstname}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                inputRef={lastNameInput}
                                defaultValue={profile.lastname}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                inputRef={emailInput}
                                defaultValue={profile.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Bio"
                                variant="outlined"
                                inputRef={bioInput}
                                defaultValue={profile.bio}
                            />
                        </Grid>

                        <Grid item xs={4} align="center">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={updateProfile}
                                startIcon={<UpdateIcon />} 
                            >
                                Update Profile
                            </Button>
                        </Grid>
                        <Grid item xs={4} align="center">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />} 
                            >
                                Log out
                            </Button>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
            </Container>
            
        );
    else
        return (
            <Container maxWidth="sm">
                <Box my={4}>
                    <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '20%', height: 'auto' }} />
                    </Box>
                    <Typography variant="h3" align="center" gutterBottom>
                    Create Your Profile
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                inputRef={firstNameInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                inputRef={lastNameInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                inputRef={emailInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Bio"
                                variant="outlined"
                                inputRef={bioInput}
                            />
                        </Grid>

                        <Grid item xs={4} align="center">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={createProfile}
                                startIcon={<CreateIcon></CreateIcon>}
                            >
                                Create Profile
                            </Button>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
            </Container>
        );
}

export default ProfilePage;