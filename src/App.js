import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );

      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error fetching data from Google Books API:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='app'>
      <div className="header">
        <div className="search">
          <input type='text' placeholder='Search book' value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown}
          />
        </div>
      </div>

        <div className="search-results">
        {searchResults.map((book) => (
          <div key={book.id}>{book.volumeInfo.title}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
