
import React, {useState, useRef, useEffect, setState } from 'react';
import Library from './Library.js'
import FileUpload from './FileUpload.js';
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
  const typeRef = useRef()
  const genreRef = useRef()
  const statusRef = useRef()
  const ratingRef = useRef()

  console.log(books)


  useEffect(() => { 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books))
  }, [books]) 
 
  function handleAdd() {
    const name = bookRef.current.value
    const author = authorRef.current.value
    const type = typeRef.current.value
    const genre = Array.from(genreRef.current.selectedOptions, option => option.value)
    const status = statusRef.current.value
    const rating = ratingRef.current.value

    if (name === '') return
    setBooks(prevBooks => {
      return [...prevBooks, {id: uuidv4(), name:name, author:author, type:type, genre:genre, status:status, rating:rating} ]
    });
    bookRef.current.value = null
    authorRef.current.value = null
    ratingRef.current.value = null
    



    
    };

    const deleteItemById = (itemId) => {
      const newBooks = books.filter(book => book.id !== itemId);
      setBooks(newBooks);
    };


    const editName = (itemId, newName, newAuthor, newType, newGenre, newStatus, newRating) => {
      setBooks(books.map(book =>
        book.id === itemId ? { ...book, name: newName, author: newAuthor, type: newType, genre: newGenre, status: newStatus, rating: newRating} : book));
      };
    
   

  return (
    <>
    <div>
      <FileUpload />
      <label className="text-sky-400">Name: </label>
      <input className='border-2 ' ref={bookRef} type='text'></input>

      <label className="text-sky-400">Author: </label>
      <input className='border-2 ' ref={authorRef} type='text'></input>

      <label className="text-sky-400">Type: </label>
      <select id="type" ref={typeRef}>
        <option value="book">Book</option>
        <option value="webnovel">Webnovel</option>
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
        <option value="manhwa">Manhwa</option>
        <option value="manhua">Manhua</option>
        <option value="movie">Movie</option>
      </select>
      
      <label className='text-sky-400'>Genre: </label>
      <select id="genre" ref={genreRef} multiple>
        <option value="action">Action</option>
        <option value="adventure">Adventure</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="fantasy">Fantasy</option>
        <option value="horror">Horror</option>
        <option value="mystery">Mystery</option>
        <option value="romance">Romance</option>
        <option value="sci-fi">Science Fiction</option>
        <option value="slice-of-life">Slice of Life</option>
        <option value="sports">Sports</option>
        <option value="supernatural">Supernatural</option>
        <option value="thriller">Thriller</option>
        <option value="mecha">Mecha</option>
        <option value="historical">Historical</option>
        <option value="musical">Musical</option>
        <option value="psychological">Psychological</option>
      </select>

      <label className='text-sky-400'>Status: </label>
      <select id="status" ref={statusRef}>
        <option value="current">Current</option>
        <option value="completed">Completed</option>
        <option value="marinating">Marinating</option>
      </select>

      <label className='text-sky-400'>Rating: </label>
      <input type='number' min="0" max="10" ref={ratingRef}></input>



      

      <button className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2' onClick={handleAdd}>Add book</button>
    </div>

    <Library books = {books} deleteItemById = {deleteItemById} editName={editName} />
    <div>{books.length} books in library</div>
    </>
    
  );
}

export default App;
