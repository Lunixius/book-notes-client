import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookCard from './components/BookCard';
import SavedBooks from './components/SavedBooks';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => setDarkMode(!darkMode);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  const saveBook = async (book) => {
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      const data = await res.json();
      console.log('Book saved:', data);
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  const SearchPage = () => (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="cards-container">
        {books.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>🔍 Start searching for books!</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="book-card-wrapper">
              <BookCard
                title={book.volumeInfo.title}
                author={(book.volumeInfo.authors || []).join(', ')}
                image={book.volumeInfo.imageLinks?.thumbnail}
                description={book.volumeInfo.description || 'No description available.'}
                onSave={() =>
                  saveBook({
                    title: book.volumeInfo.title,
                    author: (book.volumeInfo.authors || []).join(', '),
                    notes: '', // Add notes handling later
                  })
                }
              />
            </div>
          ))
        )}
      </div>
    </>
  );

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        <header>
          <h1>📚 Book Finder</h1>
          <nav>
            <Link to="/">Search</Link> | <Link to="/saved">Saved Books</Link>
          </nav>
          <div className="toggle-container">
            <span>🌞</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={darkMode} onChange={handleToggle} />
              <span className="slider" />
            </label>
            <span>🌙</span>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/saved" element={<SavedBooks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
