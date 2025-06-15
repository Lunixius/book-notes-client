import React, { useState } from 'react';

function BookCard({ title, author, image, description, onSave }) {
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await onSave({ title, author, image, description, notes });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000); // Show for 3 seconds
  };

  return (
    <div className="book-card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p><strong>Author:</strong> {author}</p>
      <p className="description">{description}</p>
      <textarea
        placeholder="Your notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={handleSave}>Save Book</button>
      {saved && <p className="saved-message">✅ Book saved successfully!</p>}
    </div>
  );
}

export default BookCard;
