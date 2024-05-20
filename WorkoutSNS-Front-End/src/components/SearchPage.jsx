//you can search for users and get user profiles to look at or follow
//when you look at
//search for posts using keywords

import {React,useState} from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearch = async (query) => {
        try {
          // Request user search results from backend
          const userResponse = await fetch('http://localhost:8085/user/search', {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          });
          const userResults = await userResponse.json();
      
          // Request post search results from backend
          const postResponse = await fetch('http://localhost:8085/post/search', {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          });
          const postResults = await postResponse.json();
      
          // Update state with search results
          setSearchResults({ userResults, postResults });
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
    };

    return(
        <>
        <p>search page</p>
        <SearchBar onSearch={handleSearch}></SearchBar>
        <SearchResults results={searchResults}></SearchResults>
        </>
    );
};

export default SearchPage;