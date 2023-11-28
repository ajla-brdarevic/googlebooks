import React from 'react';

const BookDetails = ({ match }) => {
  const bookId = match.params.bookId;

  return (
    <div>
      <h2>Book Details - {bookId}</h2>
    </div>
  );
};

export default BookDetails;
