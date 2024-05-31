import { useState, useRef, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../AuthContext";
import { silentJSON, processAlert } from "../FetchRoutines";
import { Button, TextField, Box, Container, Typography, Grid } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import logo from "../logo.png";
import ProfilePagePostsSection from "./ProfilePagePostsSection";
import UserProfileCard from "./UserProfileCard";

function ProfilePage({ setJwt }) {
    const jwt = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => { getProfile() }, []);

    function getProfile() {
        const headers = { "Authorization": "Bearer " + jwt };
        fetch("http://localhost:8085/profile/user", { method: "GET", headers: headers })
            .then(silentJSON)
            .then(response => { setProfile(response) });
    }

    function handleLogout() {
        alert("You are logged out of your account.");
        setJwt('');
    }

    if (jwt.length === 0) {
        return <p>You are not logged in to your account.</p>;
    }

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '20%', height: 'auto' }} />
                </Box>
                <Typography variant="h3" align="center" gutterBottom>
                    {profile ? null : "Create Your Profile"}
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2} justifyContent="center">
                        {profile ? (
                            <>
                                <UserProfileCard profile={profile}></UserProfileCard>
                                <Grid item xs={4} align="center">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to="/UpdateProfilePage"
                                        state={{ profile: profile }} 
                                        startIcon={<UpdateIcon />}
                                    >
                                        Update Profile
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Bio"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={4} align="center">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        startIcon={<CreateIcon />}
                                    >
                                        Create Profile
                                    </Button>
                                </Grid>
                            </>
                        )}
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
            {profile && <ProfilePagePostsSection/>}
        </Container>
    );
}

export default ProfilePage;
