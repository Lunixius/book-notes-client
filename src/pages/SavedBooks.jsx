// src/pages/SavedBooks.jsx

import React, { useEffect, useState } from 'react';

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => setSavedBooks(data))
      .catch((err) => console.error('Failed to fetch saved books:', err));
  }, []);

  return (
    <div className="saved-books-page">
      <h2>📖 Saved Books</h2>
      {savedBooks.length === 0 ? (
        <p>No saved books found.</p>
      ) : (
        <div className="cards-container">
          {savedBooks.map((book) => (
            <div key={book._id} className="book-card-wrapper">
              <div className="book-card">
                <img src={book.image} alt={book.title} />
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p>{book.description}</p>
                <p><strong>Notes:</strong> {book.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedBooks;
