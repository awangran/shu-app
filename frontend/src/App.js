
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
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Divider } from '@mui/material';




const LOCAL_STORAGE_KEY = 'shu.books'

function App() { 
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedBooks ? JSON.parse(storedBooks) : [];
  });
  const [file, setFile] = useState();

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






    if (inputs === '') return
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

    const [status, setStatus] = React.useState('');

    const handleChange3 = (event) => {
      setStatus(event.target.value);
    };

    const [value, setValue] = React.useState(2);

    const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });


    function toggleVisibility() {
      const div = document.getElementById('bookAdd')
      div.style.display = div.style.display === "none" ? "flex" : "none";
  } 
    
   

  return (
    <>
    <div className='header'>
      <h1>My Library</h1>

      <div className='headerItems'> 
        <AddIcon fontSize="large" onClick={toggleVisibility} />
        <Brightness6Icon/>
      </div>
    </div>

    <Banner/>

    <div id='bookAdd'>

      <div className='top' >
      <CloseIcon onClick={toggleVisibility} />

      </div>

      <div className='wrapper' >

        <div className='col'>
               

          <input id="fileInput" type="file" className="file" onChange={(e) => setFile(e.target.files[0])}></input>


          <TextField style={{margin: '30px 0 0 0'}} className='col-item' label="Name" variant="standard" color="secondary" onChange={(e) => setName()}/>

          <TextField style={{margin: '30px 0px'}} className='col-item' label="Author" variant="standard" color="secondary" inputRef={authorRef}/>

          <InputLabel id="typelabel">Type</InputLabel>
            <Select
              className='col-item'
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

        <div className='col'>

          <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              className='col-item'
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


        <InputLabel id="status">Status</InputLabel>
            <Select
              className='col-item'
              label="status"
              ref={statusRef} 
              value={status}
              onChange={handleChange3}
              color="secondary"
            >
              <MenuItem value="current">Current</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="marinating">Marinating</MenuItem>
            </Select>
            
            <Rating
              className='col-item'
              name="rating"
              value={value}
              size="large"
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              ref={ratingRef}
            />


           



        </div>

      </div>


      <Button className="addBtn" variant="outlined" color="secondary" onClick={upload}>Add Book</Button>

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
