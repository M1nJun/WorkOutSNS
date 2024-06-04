import React from 'react';
import PostCard from './PostCard';
import AuthContext from "../AuthContext";
import { useState,useRef,useEffect,useContext } from "react";
import { Container,Box,Grid }  from '@mui/material';

function ProfilePagePostsSection(){
    const {jwt,setJwt} = useContext(AuthContext);
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
        <Container maxWidth="sm">
            <h1>Your Posts</h1>
            <Box my={4}>
                <Grid container spacing={1} justifyContent="center">
                {posts.map((post) => (
                    <Grid item xs={6}>
                        <PostCard key={post.postID} post={post} notMe={false}/>
                    </Grid>             
                ))}
                </Grid>
            </Box>
        </Container>
    )
}

export default ProfilePagePostsSection;

