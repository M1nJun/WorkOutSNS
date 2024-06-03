//you can search for users and get user profiles to look at or follow
//when you look at
//search for posts using keywords

import {React,useState} from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { Button, Switch, FormControlLabel } from '@mui/material';

const SearchPage = () => {
    const [userSearchResults, setUserSearchResults] = useState([]);
    const [postsSearchResults, setPostsSearchResults] = useState([]);
    const [searchForUsers,setSearchForUsers]=useState(false);
    
    const handleUserSearch = async (query) => {
      try {
        // Request user search results from backend
        const userResponse = await fetch(`http://localhost:8085/profile?keyword=${encodeURIComponent(query)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(userResponse);

        if (!userResponse.ok) {
          throw new Error(`HTTP error! status: ${userResponse.status}`);
        }
    
        const userResults = await userResponse.json();
        console.log(userResults);
        setUserSearchResults(userResults);
      } catch (error) {
        console.error('Error fetching user search results:', error);
      }
    };

    const handlePostsSearch = async (query) => {
      try {
        // Request post search results from backend
        const postResponse = await fetch(`http://localhost:8085/post?tag=${encodeURIComponent(query)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!postResponse.ok) {
          throw new Error('Empty response from server');
        }

        const postResults = await postResponse.json();
        console.log(postResults);
        setPostsSearchResults(postResults);
      } catch (error) {
        console.error('Error fetching posts search results:', error);
        console.log('Query:', query);
      }
    };

    const handleSearch = (query) => {
      if (searchForUsers) {
        handleUserSearch(query);
      } else {
        handlePostsSearch(query);
      }
    };

    const toggleSearchMode = () => {
      setSearchForUsers((prev) => !prev);
    };

    return(
        <>
        <p>search page</p>
        <FormControlLabel
        control={
          <Switch
            checked={searchForUsers}
            onChange={toggleSearchMode}
            name="searchMode"
            color="primary"
          />
        }
        label={searchForUsers ? "Search for Users" : "Search for Posts"}
        />
        <SearchBar onSearch={handleSearch}></SearchBar>
        <SearchResults postsResults={postsSearchResults} userResults={userSearchResults} searchForUsers={searchForUsers}></SearchResults>
        </>
    );
};

export default SearchPage;