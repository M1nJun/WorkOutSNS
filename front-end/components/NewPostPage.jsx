import React from 'react';
import { useState,useRef,useContext } from "react";
import AuthContext from "../AuthContext";
import { silentJSON, processAlert } from "../FetchRoutines";
const NewPostPage = () =>{
    //will figure out how to get date from system later
    dateInput = useRef();
    titleInput = useRef();
    peopleTagsInput = useRef();

    //these two types need to be from a drop down menu
    workoutTypeInput = useRef();
    subWorkoutTypeInput = useRef();

    exerciceInput = useRef();
    captionInput = useRef();
    tipsInput = useRef();
    durationInput = useRef();
    caloriesInput = useRef();
    
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
            exercice: exerciceInput.current.value,
            caption: captionInput.current.value,
            tips: tipsInput.current.value,
            duration: durationInput.current.value,
            calories: caloriesInput.current.value
        };
        fetch("http://localhost:8085/posts/create", {
            method: "POST",
            body: JSON.stringify(toPost),
            headers: headers
        }).then(response => processAlert(response,"Post created."));
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
            <>
                <p>new post page</p>
                <h4>Create New Post</h4>
                <p>Title: <input type="text" ref={titleInput} /></p>
                <p>Caption: <input type="text" ref={captionInput}/></p>
                <p>Date: <input type="text" ref={dateInput}/></p>
                <p>Workout Type: <input type="text" ref={workoutTypeInput}/></p>
                <p>Sub Workout Type: <input type="text" ref={subWorkoutTypeInput}/></p>
                <p>Exercice: <input type="text" ref={exerciceInput}/></p>
                <p>Duration: <input type="text" ref={durationInput}/></p>
                <p>Calories: <input type="text" ref={caloriesInput}/></p>
                <p>Tips: <input type="text" ref={tipsInput}/></p>
                <p>Tag People: <input type="text" ref={peopleTagsInput}/></p>
                <p><button onClick={createNewPost}>Create New Post</button></p>
            </>
        );
};

export default NewPostPage;