import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, Grid, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthContext from "../AuthContext";
import PostCard from './PostCard';


function UserProfilePagePostsSection({profile}){
    const jwt = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [followStatus,setFollowStatus]=useState(false);
    const {userID} = profile;

    useEffect(() => {
        if (jwt && !hasFetched) {
            getPosts();
        }
    }, [jwt, hasFetched]);

    useEffect(()=> {
        checkFollow();
    },[jwt,userID]);

    

    function getPosts(){
        fetch('http://localhost:8085/post/user/'+userID+'/all', {
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

    function postFollow(){
        fetch('http://localhost:8085/user/follow/'+userID, {
            method: "POST",
            headers: {
              "Authorization" : "Bearer "+ jwt,
              "Content-type": "application/json; charset=UTF-8",
            },
          })
          .then(response => {
            if (response.ok) {
                setFollowStatus(true);
            }
            })
          .catch((error) => {
            console.log(error);
            alert("Login failed");
          });
    }


    function checkFollow(){
        fetch('http://localhost:8085/user/follow/check/'+userID, {
            method: "POST",
            headers: {
              "Authorization" : "Bearer "+ jwt,
              "Content-type": "application/json; charset=UTF-8",
            },
          })
          .then(response => {
            if (response.ok) {
                setFollowStatus(response.json);
            }
            })
            .catch((error) => {
                console.log(error);
                alert("Login failed");
              });

    }

    return(
        <Container maxWidth="sm">
        <Box my={4}>
        <Grid item xs={4}>
            {
                !followStatus ? (
                    <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={postFollow}
                >
                    Follow
                </Button>
                ):(
                    <Typography variant="body2" color="text.secondary">
                        Followed <CheckCircleIcon style={{ color: 'green', verticalAlign: 'middle' }} />
                    </Typography>
                )
            }
           
        </Grid>
            <Grid container spacing={1} justifyContent="center">
            {posts.map((post) => (
                <Grid item xs={6}>
                    <PostCard key={post.postID} post={post} notMe={true}/>
                </Grid>             
            ))}
            </Grid>
            
        </Box>
    </Container>
    )
}

export default UserProfilePagePostsSection;