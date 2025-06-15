import React from 'react';

const BookCard = ({ book }) => {
  const handleSaveBook = async () => {
    const notes = prompt("Enter your notes for this book:");

    if (!notes) return;

    const response = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: book.title,
        authors: book.authors?.join(', ') || 'Unknown',
        description: book.description,
        image: book.imageLinks?.thumbnail,
        infoLink: book.infoLink,
        notes
      })
    });

    const data = await response.json();
    console.log('Book saved:', data);
    alert('Book saved successfully!');
  };

  return (
    <div className="book-card">
      <img src={book.imageLinks?.thumbnail} alt={book.title} />
      <h2>{book.title}</h2>
      <p>{book.authors?.join(', ')}</p>
      <p>{book.description}</p>
      <button onClick={handleSaveBook}>Save with Notes</button>
    </div>
  );
};

export default BookCard;
