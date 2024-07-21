
import React, {useState, useRef, useEffect, setState } from 'react';
import Library from './Library.js'
import './output.css';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'shu.books'

function App() { 
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedBooks ? JSON.parse(storedBooks) : [];
  });
  const bookRef = useRef()  
  const authorRef = useRef()

  useEffect(() => { 
    console.log(books)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books))
  }, [books]) 
 
  function handleAdd() {
    const name = bookRef.current.value
    const author = authorRef.current.value

    if (name === '') return
    setBooks(prevBooks => {
      return [...prevBooks, {id: uuidv4(), name:name, author:author} ]
    });
    bookRef.current.value = null
    authorRef.current.value = null
    }

    const deleteItemById = (itemId) => {
      const newBooks = books.filter(book => book.id !== itemId);
      setBooks(newBooks);
    };

    const editName = (itemId, newName) => {
      setBooks(books.map(book =>
        book.id === itemId ? { ...book, name: newName } : book));
      };
    
   

  return (
    <>
    <div>
      <p class="text-sky-400">Book name: </p>
      <input className='border-2 ' ref={bookRef} type='text'></input>

      <p class="text-sky-400">Book author: </p>
      <input className='border-2 ' ref={authorRef} type='text'></input>

      <button className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2' onClick={handleAdd}>Add book</button>
    </div>
    <Library books = {books} deleteItemById = {deleteItemById} editName={editName} />
    <div>{books.length} books in library</div>
    </>
    
  );
}

export default App;
