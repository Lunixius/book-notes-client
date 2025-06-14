import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setBooks(res.data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div className="container">
      <h1>📚 Book Finder + Notes</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book.googleId || book.title}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.authors?.join(', ') || 'Unknown'}</p>
            {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
            <p>{book.description || 'No description available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
