
import React, {useState, useRef, useEffect } from 'react';
import Library from './Library.js'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'shu.books'

function App() {
  const [books, setBooks] = useState([])
  const bookRef = useRef()

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedBooks) setBooks( prevBooks => [...prevBooks, ...storedBooks]);
  }, [])

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
  

  return (
    <>
    <div>
      <p>Book name: </p>
      <input ref={bookRef} type='text'></input>
      <button onClick={handleAdd}>Add book</button>
    </div>
    <Library books = {books}/>
    <div>0 books in library</div>
    </>
    
  );
}

export default App;
