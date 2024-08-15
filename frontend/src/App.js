
import React, {useState, useRef, useEffect, setState } from 'react';
import Library from './Library.js'
import './output.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Banner from './Banner.js';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';




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


      const [type, setType] = React.useState('');

      const handleChange = (event) => {
        setType(event.target.value);
      };

      const names = [
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
        'Fantasy',
        'Horror',
        'Mystery',
        'Romance',
        'Science Fiction',
        'Slife of Life',
        'Sports',
        'Supernatural',
        'Thriller',
        'Mecha',
        'Historical',
        'Musical',
        'Psychological'
      ];

      const [genreName, setGenreName] = React.useState([]);

      const handleChange2 = (event) => {
        const {
        target: { value },
      } = event;
        setGenreName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
    );};

    
   

  return (
    <>
    <div className='header'>
      <h1>My Library</h1>

      <div className='headerItems'>
        <AddIcon fontSize="large"/>
        <Brightness6Icon/>
      </div>
    </div>

    <Banner/>

    <div id='bookAdd'>

      <div className='top' >
      <CloseIcon />

      </div>

      <div className='wrapper' >

        <div className='col-1'>

          <TextField id="standard-basic" label="Name" variant="standard" color="secondary" ref={bookRef}/>
          <TextField id="standard-basic" label="Author" variant="standard" color="secondary" ref={authorRef}/>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              label="Type"
              ref={typeRef} 
              value={type}
              onChange={handleChange}
              color="secondary"

            >
              <MenuItem value="book">Book</MenuItem>
              <MenuItem value="webnovel">Webnovel</MenuItem>
              <MenuItem value="anime">Anime</MenuItem>
              <MenuItem value="manga">Manga</MenuItem>
              <MenuItem value="manwha">Manwha</MenuItem>
              <MenuItem value="manhua">Manhua</MenuItem>
              <MenuItem value="movie">Movie</MenuItem>
            </Select>


        </div>

        <div className='col-2'>

          <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre"
              multiple
              value={genreName}
              onChange={handleChange2}
              input={<OutlinedInput label="Genre" />}
              ref={genreRef}
            >
              {names.map((genre) => (
                <MenuItem
                  key={genre}
                  value={genre}
                >
                  {genre}
                </MenuItem>
              ))}
            </Select>



        </div>

      </div>




  {/*     
      <input id="fileInput" type="file" className="file" onChange={(e) => setFile(e.target.files[0])}></input>
 */}

      

{/*    

     
    

      <label className=''>Status: </label>
      <select id="status" ref={statusRef}>
        <option value="current">Current</option>
        <option value="completed">Completed</option>
        <option value="marinating">Marinating</option>
      </select>

      <label className=''>Rating: </label>
      <input type='number' min="0" max="10" ref={ratingRef}></input>

      <button className='text-white py-1 px-2 rounded m-2' onClick={upload}>Add book</button> */}



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
