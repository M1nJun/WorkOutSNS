import React from 'react';
import UserProfileCard from './UserProfileCard';
import { Container, Box, Grid } from '@mui/material';
import PostCard from './PostCard';


const SearchResults = ({ postsResults, userResults, searchForUsers }) => {
  
  console.log("Search Results Props:", { postsResults, userResults, searchForUsers }); 

  

    return (
        <Container maxWidth="sm">
            <h1>Search Results</h1>
            <Box my={4}>
                <Grid container spacing={1} justifyContent="center">
                    {searchForUsers ? (
                        userResults.length > 0 ? (
                            userResults.map((userProfile) => (
                                <Grid item xs={6} key={userProfile.userID}>
                                    <UserProfileCard profile={userProfile} notMe={true} />
                                </Grid>
                            ))
                        ) : (
                            <p>No user results found.</p>
                        )
                    ) : (
                        postsResults.length > 0 ? (
                            postsResults.map((post) => (
                                <Grid item xs={6} key={post.postID}>
                                    <PostCard post={post} notMe={true}/>
                                </Grid>
                            ))
                        ) : (
                            <p>No post results found.</p>
                        )
                    )}
                </Grid>
            </Box>
        </Container>
    );
};

export default SearchResults;
