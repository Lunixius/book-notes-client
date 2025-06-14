import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setBooks(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Book Finder</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          style={{ width: '300px', marginRight: '1rem' }}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        {books.map((book) => (
          <div key={book.googleId} style={{ marginBottom: '1rem' }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.authors.join(', ')}</p>
            <img src={book.thumbnail} alt={book.title} width="100" />
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
