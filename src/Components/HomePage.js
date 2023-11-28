// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);

  useEffect(() => {
    // Fetch random books on component mount
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
    // Fetch books based on search term
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
    // Trigger search on Enter key press
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
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
          <Link key={book.id} to={`/books/${book.id}`} className='book-info'>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || ''}
              alt={book.volumeInfo.title}
              className='book-cover'
            />
            <h3>{book.volumeInfo.title}</h3>
            <h5>{book.volumeInfo.authors}</h5>
          </Link>
        ))}

        {searchResults.map((book) => (
          <Link key={book.id} to={`/books/${book.id}`} className='book-info'>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || ''}
              alt={book.volumeInfo.title}
              className='book-cover'
            />
            <h3>{book.volumeInfo.title}</h3>
            <h5>{book.volumeInfo.authors}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
