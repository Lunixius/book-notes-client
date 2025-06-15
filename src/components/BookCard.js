import React, { useState } from 'react';

function BookCard({ title, author, image, description, onSave }) {
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    onSave({ title, author, image, description, notes });
    setNotes('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
      {image && <img src={image} alt={title} className="h-48 object-contain mx-auto mb-4" />}
      <h2 className="text-lg font-bold mb-1">{title}</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">👤 {author}</p>
      <p className="text-justify text-sm flex-1">{description}</p>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="📝 Your notes..."
        className="mt-3 p-2 border rounded w-full text-black"
      />

      <button
        onClick={handleSave}
        className="mt-2 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
      >
        Save Book
      </button>
    </div>
  );
}

export default BookCard;
