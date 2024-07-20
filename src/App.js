
import React, {useState, useRef, useEffect, setState } from 'react';
import Library from './Library.js'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'shu.books'

function App() { 
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedBooks ? JSON.parse(storedBooks) : [];
  });
  const bookRef = useRef()  


  useEffect(() => { 
    console.log(books)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books))
  }, [books]) 
 
  function handleAdd() {
    const name = bookRef.current.value
    if (name === '') return
    setBooks(prevBooks => {
      return [...prevBooks, {id: uuidv4(), name:name} ]
    });
    bookRef.current.value = null
    }

    const deleteItemById = (itemId) => {
      const newBooks = books.filter(book => book.id !== itemId);
      setBooks(newBooks);
    };
    
   

  return (
    <>
    <div>
      <p>Book name: </p>
      <input ref={bookRef} type='text'></input>
      <button onClick={handleAdd}>Add book</button>
    </div>
    <Library books = {books} deleteItemById = {deleteItemById} />
    <div>{books.length} books in library</div>
    </>
    
  );
}

export default App;
