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
    <div>
      <h2>{bookDetails.title}</h2>
      <p>Authors: {bookDetails.authors?.join(', ') || 'Unknown'}</p>
      <p>Published Date: {bookDetails.publishedDate || 'Unknown'}</p>
      <p>Description: {bookDetails.description || 'No description available.'}</p>
      <p>Page Count: {bookDetails.pageCount || 'Unknown'}</p>
    </div>
  );
};

export default BookDetails;
