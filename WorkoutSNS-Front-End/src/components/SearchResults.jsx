import React from 'react';
import UserProfileCard from './UserProfileCard';

const SearchResults = ({ postsResults, userResults,searchForUsers }) => {


  return(
    <Container maxWidth="sm">
      <h1>Search Results</h1>
      <Box my={4}>
        <Grid container spacing={1} justifyContent="center">
        {searchForUsers ? 
        ( userResults.map((userProfile)=> (
          <Grid item xs={6}>
            <UserProfileCard key={userProfile.userID} profile={userProfile}></UserProfileCard>
          </Grid>
        ))
      
      ) : (
          postsResults.map((post)=>{
            <Grid item xs={6}>
              <PostCard key={post.postID} post={post} notMe={true} ></PostCard>
            </Grid>
          })
        )}  
        </Grid>
      </Box>
    </Container>
  
    
    
  )

};

export default SearchResults;