import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);

  useEffect(() => {
    const fetchRandomBooks = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=book&maxResults=18'
        );

        const shuffledResults = response.data.items.sort(() => 0.5 - Math.random()).slice(0, 18);

        setRandomBooks(shuffledResults);
      } catch (error) {
        console.error('Error fetching random books:', error);
      }
    };

    fetchRandomBooks();
  }, []);

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
          <input
            type='text'
            placeholder='Search book'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="container">
        {searchResults.length === 0 && randomBooks.map((book) => (
          <div key={book.id} className='book-info'>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || ''}
              alt={book.volumeInfo.title}
              className='book-cover'
            />
            <h3>{book.volumeInfo.title}</h3>
            <h5>{book.volumeInfo.authors}</h5>
          </div>
        ))}

        {searchResults.map((book) => (
          <div key={book.id} className='book-info'>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || ''}
              alt={book.volumeInfo.title}
              className='book-cover'
            />
            <h3>{book.volumeInfo.title}</h3>
            <h5>{book.volumeInfo.authors}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
