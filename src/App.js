import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import BookCard from './components/BookCard';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setBooks(res.data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-bar">
        <div className="app-bar-inner">
          <h1>📚 Book Finder + Notes</h1>
          <button onClick={toggleDarkMode} className="toggle-btn">
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </header>

      <div className="container">
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
              <BookCard key={book.id} book={book} />
              {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
              <div className="book-info">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.authors?.join(', ') || 'Unknown'}</p>
                <p>{book.description || 'No description available.'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
