import React from 'react';
import UserProfileCard from './UserProfileCard';
import { useLocation} from 'react-router-dom';
import PostCard from './PostCard';
import { Button, TextField, Box, Container, Typography, Grid } from '@mui/material';
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import UserProfilePagePostsSection from './UserProfilePagePostsSection';
import logo from "../logo.png";

function UserProfilePage(){
    const location = useLocation();
    const profile = location.state?.profile;
    return(
        <Container maxWidth="sm">
            <Box my={4}>
                <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '20%', height: 'auto' }} />
                </Box>
                <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={8} align="center">
                            <UserProfileCard profile={profile} notMe={true} viewProfile={false}></UserProfileCard>
                        </Grid>
                        <Grid  item xs={12} align="center">
                            <UserProfilePagePostsSection profile={profile}></UserProfilePagePostsSection>
                        </Grid>       
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default UserProfilePage;