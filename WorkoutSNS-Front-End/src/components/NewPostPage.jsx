import React from 'react';
import { useState,useRef,useContext } from "react";
import AuthContext from "../AuthContext";
import { silentJSON, processAlert } from "../FetchRoutines";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { InputLabel,Button, TextField,Box, Container, Typography, Grid, LinearProgress} from '@mui/material';
import logo from "../logo.png";
import { styled } from '@mui/system';
import ConfirmationPage from './ConfirmationPage';
const NewPostPage = () =>{
    const [progress, setProgress] = useState(0);
    const [postCreated, setPostCreated] = useState(false);


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

    const inputRefs = [
        titleInput, captionInput, dateInput, workoutTypeInput, subWorkoutTypeInput,
        exerciseInput, durationInput, caloriesInput, tipsInput, peopleTagsInput, tagsInput
    ];

    const handleInputChange = () => {
        const filledFields = inputRefs.filter(ref => ref.current && ref.current.value.trim() !== '').length;
        const totalFields = inputRefs.length;
        const progressPercentage = (filledFields / totalFields) * 100;
        setProgress(progressPercentage);
    };

    const ColoredLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        backgroundColor: '#e0e0e0',
        '& .MuiLinearProgress-bar': {
            backgroundColor: progress === 100 ? 'green' : 'red',
        },
    }));

    //you need to be logged in to be able to post
    const jwt = useContext(AuthContext);

    function createNewPost() {
        const headers = {"Authorization" : "Bearer "+ jwt,"Content-type" : "application/json; charset=UTF-8"};
        const toPost = {
            date: dateInput.current.value,
            title: titleInput.current.value,
            tagPeople: peopleTagsInput.current.value,
            workoutType: workoutTypeInput.current.value,
            subWorkoutType: subWorkoutTypeInput.current.value,  
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
        }).then(response => processAlert(response,"Post created."))
        .then(setPostCreated(true));
    }

    if(jwt.length == 0)
        return (
            <div>
                <p>You are not logged in to your account.</p> 
                <p>You cannot create a new post.</p>
            </div>
        );
    else
        return(
            <div>
                { postCreated ? (
                    <ConfirmationPage></ConfirmationPage>
                ) : (
                    <Container maxWidth="md">
                <Box my={0}>
                    <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '20%', height: 'auto' }} />
                    </Box>
                    <Typography variant="h3" align="center" gutterBottom>
                    Create New Post
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <ColoredLinearProgress variant="determinate" value={progress}/>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="title" sx={{ color: 'white' }}>Title</InputLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                inputRef={titleInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="caption" sx={{ color: 'white' }}>Caption</InputLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                inputRef={captionInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="date" sx={{ color: 'white' }}>Date</InputLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                inputRef={dateInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="workoutType" sx={{ color: 'white' }}>Workout Type</InputLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                inputRef={workoutTypeInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="subWorkoutType" sx={{ color: 'white' }}>Sub Workout Type</InputLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                inputRef={subWorkoutTypeInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="exercise" sx={{ color: 'white' }}>Exercise</InputLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                inputRef={exerciseInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="duration" sx={{ color: 'white' }}>Duration</InputLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                inputRef={durationInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="caloriesBurnt" sx={{ color: 'white' }}>Calories Burnt</InputLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                inputRef={caloriesInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="tips" sx={{ color: 'white' }}>Tips</InputLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                inputRef={tipsInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="peopleTagged" sx={{ color: 'white' }}>Tag People</InputLabel>
                            <TextField
                                fullWidth
                               
                                variant="outlined"
                                inputRef={peopleTagsInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="tags" sx={{ color: 'white' }}>Tags</InputLabel>
                            <TextField
                                fullWidth
                            
                                variant="outlined"
                                inputRef={tagsInput}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={4} align="center" my={4}>
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
                )}
            </div>
            
        );
};

export default NewPostPage;