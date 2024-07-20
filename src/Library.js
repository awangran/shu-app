import React from 'react'
import Book from './Book'
export default function Library({books, deleteItemById}) {
    
  return (
    books.map( book => {
        return <Book key = {book.id}  book={book} deleteItemById={deleteItemById}  />
        
    })
  )
}
