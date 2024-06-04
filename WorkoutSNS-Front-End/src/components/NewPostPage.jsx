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
    const {jwt,setJwt} = useContext(AuthContext);
    const [progress, setProgress] = useState(0);
    const [postCreated, setPostCreated] = useState(false);

    const titleInput = useRef();
    const workoutTypeInput = useRef();
    const subWorkoutTypeInput = useRef();
    const exerciseInput = useRef();
    const captionInput = useRef();
    const tipsInput = useRef();
    const durationInput = useRef();
    const caloriesInput = useRef();
    const tagsInput = useRef();
    
    //need to add an input for uploading image that goes with the new post

    const inputRefs = [
        titleInput, captionInput,workoutTypeInput, subWorkoutTypeInput,
        exerciseInput, durationInput, caloriesInput, tipsInput, tagsInput
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



    function createNewPost() {
        console.log(jwt);
        const headers = {"Authorization" : "Bearer "+ jwt,"Content-type" : "application/json; charset=UTF-8"};
        const toPost = {
            title: titleInput.current.value,
            body: captionInput.current.value,
            workout: workoutTypeInput.current.value,
            subWorkout: subWorkoutTypeInput.current.value,  
            exercise: exerciseInput.current.value,
            tips: tipsInput.current.value,
            duration: parseInt(durationInput.current.value, 10),
            calories: parseInt(caloriesInput.current.value, 10),
            //convert the tags to an arrray before sending it as a dto
            tags: tagsInput.current.value.split(',').map(tag => tag.trim()), 
        };
        fetch("http://localhost:8085/post", {
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