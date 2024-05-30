import React from 'react';
import PostCard from './PostCard';
import AuthContext from "../AuthContext";
import { useState,useRef,useEffect,useContext } from "react";

function ProfilePagePostsSection(){
    const jwt = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    useEffect(() => {
        if (jwt && !hasFetched) {
            getOwnPosts();
        }
    }, [jwt, hasFetched]);

    function getOwnPosts(){
        fetch('http://localhost:8085/post/user/self/all', {
            method: "GET",
            headers: {
            "Authorization" : "Bearer "+jwt,
            "Content-type" : "application/json; charset=UTF-8"
            },
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            setPosts(data);
            setHasFetched(true);
        })
        .catch((error) => console.error('Error fetching posts:', error));
    }
    return(
        <>
            <h2>Posts Section</h2>
            <ul>
                {posts.map((post) => (
                    <PostCard key={post.postID} post={post}/>
                ))}
            </ul>
        </>
    )
}

export default ProfilePagePostsSection;