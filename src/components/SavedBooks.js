import React, { useEffect, useState } from 'react';

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => setSavedBooks(data))
      .catch((err) => console.error('Error fetching saved books:', err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">📖 Saved Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedBooks.map((book) => (
          <div key={book._id} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">by {book.author}</p>
            <p className="text-sm">{book.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedBooks;
