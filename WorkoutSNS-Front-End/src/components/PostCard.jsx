import React from "react";

const PostCard = (post) => {
    // the post should also show the username of the person who posted it
    // this should be handled in the backend

    //destructure the post object and access its properties
    const {
        date, title, tagPeople, workoutType, subWorkoutType, exercice, caption, tips, duration, calories
    } = post;

    return (
        <div>
            <h3>{title}</h3>
            <h4>{caption}</h4>
        </div>
    )
}

export default PostCard;