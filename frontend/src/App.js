
import React, {useState, useRef, useEffect, setState } from 'react';
import Library from './Library.js'
import './output.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


const LOCAL_STORAGE_KEY = 'shu.books'

function App() { 
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedBooks ? JSON.parse(storedBooks) : [];
  });
  const [file, setFile] = useState(null);
  const  [customId, setCustomId] = useState('')

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleIdChange = (id) => {
    setCustomId(id);
    };

  
  const handleSubmit = async (e) => {
    //e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', customId);
    try {
        await axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert('File name ' + {customId} + 'uploaded successfully');
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file');
    }
};


  
  function handleAdd() {
    const id = uuidv4()
    const name = bookRef.current.value
    const author = authorRef.current.value
    const type = typeRef.current.value
    const genre = Array.from(genreRef.current.selectedOptions, option => option.value)
    const status = statusRef.current.value
    const rating = ratingRef.current.value

    if (name === '') return
    setBooks(prevBooks => {
      return [...prevBooks, {id: id, name:name, author:author, type:type, genre:genre, status:status, rating:rating} ]
    });

    handleIdChange(id);

    handleSubmit();

    bookRef.current.value = null
    authorRef.current.value = null
    ratingRef.current.value = null
   
    };

    //mondongo file upload handlrerr

    
    

  //deleteand edit localstorage info
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
    <form>
        <div>
            <label htmlFor="file">File:</label>
            <input type="file" id="file" onChange={handleFileChange} required />
        </div>
    </form>

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
