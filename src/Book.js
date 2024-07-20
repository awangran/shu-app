import React from 'react'

export default function Book( {book, deleteBook, deleteItemById} ) {
    function handleDelete() {
        deleteItemById(book.id)
    }
    
  return (
    <div>
      {book.name}
      <button onClick={handleDelete}>delete</button>
    </div>

  )
}
