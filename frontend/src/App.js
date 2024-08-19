
import React, {useState, useRef, useEffect, setState } from 'react';
import Library from './Library.js'
import './output.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Banner from './Banner.js';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';



const LOCAL_STORAGE_KEY = 'shu.books'

function App() { 
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedBooks ? JSON.parse(storedBooks) : [];
  });
  const [file, setFile] = useState();

  const bookRef = useRef()  
  const authorRef = useRef()
  const typeRef = useRef()
  const genreRef = useRef()
  const statusRef = useRef()
  const ratingRef = useRef()
  const imageRef = useRef()

  console.log(books)


  useEffect(() => { 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books))
  }, [books]) 


  function handleAdd(val) {
    const id = uuidv4()
    const name = bookRef.current.value
    const author = authorRef.current.value
    const type = typeRef.current.value
    const genre = Array.from(genreRef.current.selectedOptions, option => option.value)
    const status = statusRef.current.value
    const rating = ratingRef.current.value
    const image = val


    if (name === '') return
    setBooks(prevBooks => {
      return [...prevBooks, {id: id, name:name, author:author, type:type, genre:genre, status:status, rating:rating, image:image} ]
    });


    bookRef.current.value = null
    authorRef.current.value = null
    ratingRef.current.value = null
  
   
    };
//  upload file and send data to server

    const upload = () => {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
    
      
      const formData = new FormData()
      formData.append('file', file)

      const imageName = file.name
      
      axios.post('http://localhost:3001/upload', formData)
      .then( res => {
        console.log('File uploaded successfully:', file.name);
      })
      .catch( er => console.log(er))


      handleAdd(imageName)

      const afile = document.querySelector('.file');
      afile.value = ''; 
    } 

    
    

  //deleteand edit localstorage info
    const deleteItemById = (itemId) => {
      const newBooks = books.filter(book => book.id !== itemId);
      setBooks(newBooks);
    };


    const editName = (itemId, newName, newAuthor, newType, newGenre, newStatus, newRating) => {
      setBooks(books.map(book =>
        book.id === itemId ? { ...book, name: newName, author: newAuthor, type: newType, genre: newGenre, status: newStatus, rating: newRating} : book));
      };

    //toggle add

    const toggleAdd = () => {
      const x = document.getElementById('bookAdd')
      x.style.display = x.style.display === "none" ? "flex" : "none";

    }
    

    //toggle dark and light mode

    const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light');

      useEffect(() => {
        document.body.style.backgroundColor = mode === 'light' ? '#ffffff' : '#1e1e1e';
        localStorage.setItem('mode', mode);
      }, [mode]);

      const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode); 
      };



   

  return (
    <>
    <div className='header'>
      <h1>My Library</h1>

      <div className='headerItems'>
        <AddIcon fontSize="large" onClick={toggleAdd}/>
        <Brightness6Icon onClick={toggleMode}/>
      </div>
    </div>

    <Banner/>

    <div id='bookAdd'>

      <div className='top' >
      <h1>Add Book</h1>
      <CloseIcon onClick={toggleAdd} />

      </div>

      <div className='wrapper' >

        <div className='col'>
        <input id="fileInput" type="file" className="file" onChange={(e) => setFile(e.target.files[0])}></input>

        <label className="">Name</label>
        <input className='' ref={bookRef} type='text'></input>

        <label className="">Author</label>
        <input className='' ref={authorRef} type='text'></input>

      <label className="">Type</label>
      <select id="type" ref={typeRef}>
        <option value="book">Book</option>
        <option value="webnovel">Webnovel</option>
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
        <option value="manhwa">Manhwa</option>
        <option value="manhua">Manhua</option>
        <option value="movie">Movie</option>
      </select>

          

        </div>

        <div className='col'>

          <label className=''>Genre</label>
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

          <label className=''>Status</label>
          <select id="status" ref={statusRef}>
            <option value="current">Current</option>
            <option value="completed">Completed</option>
            <option value="marinating">Marinating</option>
          </select>

          <label className=''>Rating</label>
          <input type='number' min="0" max="10" ref={ratingRef}></input>

          <button className='add-btn' onClick={upload}>Add book</button>


        </div>

      </div>

      </div> 

{/* render library */}

  <div className='library'>

    <Library books = {books} deleteItemById = {deleteItemById} editName={editName} />
    {/* <div>{books.length} books in library</div>  */}

  </div>

  


    </>
    
  );
}

export default App;
