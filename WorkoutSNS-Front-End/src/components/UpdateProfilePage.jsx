import React, { useRef, useContext, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Container, Typography, Grid } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import logo from "../logo.png";
import AuthContext from "../AuthContext";
import { silentJSON, processAlert } from "../FetchRoutines";

function UpdateProfilePage() {
    const jwt = useContext(AuthContext);
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const emailInput = useRef();
    const bioInput = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const profile = location.state?.profile;

    useEffect(() => {
        if (profile) {
            firstNameInput.current.value = profile.firstname || '';
            lastNameInput.current.value = profile.lastname || '';
            emailInput.current.value = profile.email || '';
            bioInput.current.value = profile.bio || '';
        } else {
            // Redirect to profile page if no profile data is passed
            navigate("/profile");
        }
    }, [profile, navigate]);

    
    function updateProfile() {
        const headers = { "Authorization": "Bearer " + jwt, "Content-type": "application/json; charset=UTF-8" };
        const toPost = {
            firstname: firstNameInput.current.value,
            lastname: lastNameInput.current.value,
            email: emailInput.current.value,
            bio: bioInput.current.value
        };

        fetch("http://localhost:8085/profile", {
            method: "POST",
            body: JSON.stringify(toPost),
            headers: headers
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to update profile");
            }
        })
        .then(data => {
            processAlert(data, "Profile updated.");
            navigate("/profile");
        })
        .catch(error => console.error("Error updating profile:", error));
    }

    if (!profile) {
        return null; 
    }

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
                                onClick={updateProfile}
                                startIcon={<UpdateIcon />}
                            >
                                Update Profile
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default UpdateProfilePage;
