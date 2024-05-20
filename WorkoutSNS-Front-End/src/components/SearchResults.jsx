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
      {renderUserResults(userResults)}
      <h2>Post Results</h2>
      {renderPostResults(postResults)}
    </div>
  );
};

export default SearchResults;