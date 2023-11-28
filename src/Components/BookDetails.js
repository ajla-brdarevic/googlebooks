import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );

        setBookDetails(response.data.volumeInfo);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (!bookDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app-details">
      <div className='details'>
        <img
          src={bookDetails.imageLinks.thumbnail || ''}
          className='book-image'
        />
        <h2>{bookDetails.title}</h2>
        <p>Authors: <b>{bookDetails.authors?.join(', ') || 'Unknown'}</b></p>
        <p>Published Date: <b>{bookDetails.publishedDate || 'Unknown'}</b></p>
        <p>Description: <b>{bookDetails.description || 'No description available.'}</b></p>
        <p>Page Count: <b>{bookDetails.pageCount || 'Unknown'}</b></p>
      </div>
    </div>
  );
};

export default BookDetails;
