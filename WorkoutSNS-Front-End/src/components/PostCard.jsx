import React from "react";

const PostCard = ({post}) => {
    // the post should also show the username of the person who posted it
    // this should be handled in the backend

    //destructure the post object and access its properties
    const {
        title, tags, workout, subworkout, exercise, caption, tips, duration, calories
    } = post;

    return (
        <div>
            <h3>{title}</h3>
            <h4>{caption}</h4>
            <p><strong>Tags:</strong> {tags.join(', ')}</p>
            <p><strong>Workout Type:</strong> {workout}</p>
            <p><strong>Sub-Workout Type:</strong> {subworkout}</p>
            <p><strong>Exercise:</strong> {exercise}</p>
            <p><strong>Duration:</strong> {duration} minutes</p>
            <p><strong>Calories Burned:</strong> {calories}</p>
            <p><strong>Caption:</strong> {caption}</p>
            <p><strong>Tips:</strong> {tips}</p>
        </div>
    )
}

export default PostCard;