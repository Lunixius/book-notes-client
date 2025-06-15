// src/pages/SavedBooks.jsx

import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setSavedBooks(data))
      .catch(err => console.error('Failed to fetch saved books:', err));
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">📚 Your Saved Books</h2>
      <div className="cards-container">
        {savedBooks.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No saved books yet.</p>
        ) : (
          savedBooks.map((book) => (
            <div key={book._id} className="book-card-wrapper">
              <BookCard
                title={book.title}
                author={book.author}
                description={book.notes}
                image={book.image}
                // Optional: add deleteBook here later
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavedBooks;

