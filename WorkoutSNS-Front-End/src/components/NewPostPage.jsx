import React from 'react';
import { useState,useRef,useContext } from "react";
import AuthContext from "../AuthContext";
import { silentJSON, processAlert } from "../FetchRoutines";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, TextField,Box, Container, Typography, Grid} from '@mui/material';
import logo from "../logo.png";

const NewPostPage = () =>{
    //get the workout types from mysql
    //get the subworkout types from mysql
    //get the exercice from mysql


    //will figure out how to get date from system later
    const dateInput = useRef();
    const titleInput = useRef();
    const peopleTagsInput = useRef();

    //these two types need to be from a drop down menu
    const workoutTypeInput = useRef();
    const subWorkoutTypeInput = useRef();

    const exerciseInput = useRef();
    const captionInput = useRef();
    const tipsInput = useRef();
    const durationInput = useRef();
    const caloriesInput = useRef();
    
    //we need to add a tags property because its necessary for filtering and search
    const tagsInput = useRef();
    
    //need to add an input for uploading image that goes with the new post

    //you need to be logged in to be able to post
    const jwt = useContext(AuthContext);

    function createNewPost() {
        const headers = {"Authorization" : "Bearer "+ jwt,"Content-type" : "application/json; charset=UTF-8"};
        const toPost = {
            date: dateInput.current.value,
            title: titleInput.current.value,
            tagPeople: peopleTagsInput.current.value,
            workoutType: workoutType.current.value,
            subWorkoutType: workoutType.current.value,  
            exercise: exerciseInput.current.value,
            caption: captionInput.current.value,
            tips: tipsInput.current.value,
            duration: durationInput.current.value,
            calories: caloriesInput.current.value,
            tags: tagsInput.current.value,
        };
        fetch("http://localhost:8085/posts/create", {
            method: "POST",
            body: JSON.stringify(toPost),
            headers: headers
        }).then(response => processAlert(response,"Post created."));
    }

    // if(jwt.length == 0)
    //     return (
    //         <div>
    //             <p>You are not logged in to your account.</p> 
    //             <p>You cannot create a new post.</p>
    //         </div>
    //     );
    // else
        return(
            <Container maxWidth="sm">
                <Box my={4}>
                    <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Box>
                    <Typography variant="h3" align="center" gutterBottom>
                    Create New Post
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Title"
                                variant="outlined"
                                inputRef={titleInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Caption"
                                variant="outlined"
                                inputRef={captionInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Date"
                                variant="outlined"
                                inputRef={dateInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Workout Type"
                                variant="outlined"
                                inputRef={workoutTypeInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="SubWorkout Type"
                                variant="outlined"
                                inputRef={subWorkoutTypeInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Exercise"
                                variant="outlined"
                                inputRef={exerciseInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Duration"
                                variant="outlined"
                                inputRef={durationInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Calories Burnt"
                                variant="outlined"
                                inputRef={caloriesInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Tips"
                                variant="outlined"
                                inputRef={tipsInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Tag People:"
                                variant="outlined"
                                inputRef={peopleTagsInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Tags:"
                                variant="outlined"
                                inputRef={tagsInput}
                            />
                        </Grid>
                        <Grid item xs={4} align="center">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={createNewPost}
                                startIcon={<AddCircleOutlineIcon />} 
                            >
                                    Create Post     
                            </Button>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
            </Container>
        );
};

export default NewPostPage;