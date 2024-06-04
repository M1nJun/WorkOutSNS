import { useState, useRef, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../AuthContext";
import { processAlert, silentJSON } from "../FetchRoutines";
import { Button, TextField, Box, Container, Typography, Grid } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import logo from "../logo.png";
import ProfilePagePostsSection from "./ProfilePagePostsSection";
import UserProfileCard from "./UserProfileCard";

function ProfilePage() {
    const { jwt, setJwt } = useContext(AuthContext);
    console.log(jwt);
    const [profile, setProfile] = useState(null);

    const bioInput = useRef();
    const firstnameInput = useRef();
    const lastnameInput = useRef();
    const emailInput = useRef();

    useEffect(() => {
        if (jwt) {
            getProfile();
        }
    }, [jwt]);

    const getProfile = () => {
        const headers = { "Authorization": `Bearer ${jwt}` };
        fetch("http://localhost:8085/profile/self", { method: "GET", headers })
            .then(silentJSON)
            .then(response => {
                setProfile(response);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    };

    const createProfile = () => {
        const headers = {
            "Authorization": `Bearer ${jwt}`,
            "Content-type": "application/json; charset=UTF-8"
        };
        const toPost = {
            firstname: firstnameInput.current.value,
            lastname: lastnameInput.current.value,
            email: emailInput.current.value,
            bio: bioInput.current.value
        };

        fetch("http://localhost:8085/profile", {
            method: "POST",
            body: JSON.stringify(toPost),
            headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Profile creation failed");
                }
                return processAlert(response, "Profile created.");
            })
            .then(() => {
                getProfile(); // Fetch updated profile
                console.log(profile);
            })
            .catch(error => {
                console.error('Error creating profile:', error);
            });
    };

    const handleLogout = () => {
        alert("You are logged out of your account.");
        setJwt('');
    };

    if (!jwt) {
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
                                <UserProfileCard profile={profile} />
                                <Grid item xs={4} align="center">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to="/UpdateProfilePage"
                                        state={{ profile }}
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
                                        inputRef={firstnameInput}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        variant="outlined"
                                        inputRef={lastnameInput}
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
                                        startIcon={<CreateIcon />}
                                        onClick={createProfile}
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
            {profile && <ProfilePagePostsSection />}
        </Container>
    );
}

export default ProfilePage;
