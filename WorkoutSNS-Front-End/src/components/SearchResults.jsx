import React from 'react';
import UserSearchResult from './UserSearchResult';
import PostSearchResult from './PostSearchResult';

const SearchResults = ({ results }) => {
  const { userResults, postResults } = results;

  // Render user search results
  const renderUserResults = (userResults) => {
    // Render userResults...
  };

  // Render post search results
  const renderPostResults = (postResults) => {
    // Render postResults...
  };

  return (
    <div>
      <h2>User Results</h2>
      {userResults.length > 0 ? renderPostResults(results) : <p>No results found</p>}
      <h2>Post Results</h2>
      {postResults.length > 0 ? renderPostResults(results) : <p>No results found</p>}
    </div>
  );
};

export default SearchResults;