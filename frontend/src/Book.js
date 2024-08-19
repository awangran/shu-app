import React, {useRef, useState} from 'react'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';


export default function Book( {book, deleteItemById, editName} ) {
    

    const editRef = useRef()
    const nameRef = useRef()
    const authoreditRef = useRef()
    const editTypeRef = useRef()
    const editGenreRef = useRef()
    const editStatusRef = useRef()
    const editRatingRef = useRef()

    function handleDelete() {
      deleteItemById(book.id)
  }

    const toggleEdit = () => {
      const x = editRef.current
      x.style.display = x.style.display === "none" ? "flex" : "none";

      
    }
    

    const handleEdit = (event) => {
        const newName = nameRef.current.value
        const newAuthor = authoreditRef.current.value
        const newType = editTypeRef.current.value
        const newGenre = Array.from(editGenreRef.current.selectedOptions, option => option.value);
        const newStatus = editStatusRef.current.value
        const newRating = editRatingRef.current.value

        if (newName === ''|| newAuthor === '') {
            alert('Please dont leave blanks.')
        } else {
            alert('Edited')
            editName(book.id, newName, newAuthor, newType, newGenre, newStatus, newRating)
        }
    }

    //hide and see book info on hover

    const[hidden, setHidden] = useState(true);


    const cover = '/assets/images/' + book.image
    
    
  return (
    <>
    <div className='bookWrapper'>

      <div className="book" 
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      style={{backgroundImage:`url(${cover})`}}
      >

      
    {/* <p>{book.name} | {book.author} | {book.type} | {book.genre} | {book.status} | {book.rating} | {book.image} </p> */}
      
    {/*   <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2" onClick={handleDelete}>delete</button>
      <button onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2">edit</button>
 */}
    
      <div id='bookInfo' className={`hidden-element ${hidden ? '' : 'show'}`}>
      
      {hidden ? null : 
        <>
        <div className='label'>
          <PersonOutlinedIcon/>
          <p>{book.author}</p>
        </div>

        <div className='label'>
          <StyleOutlinedIcon/>
          <p>{book.genre}</p>
        </div>

        <div className='label'>
          <CheckBoxOutlinedIcon/>
          <p>{book.status}</p>
        </div>

        <div className='label'>
          <StarBorderPurple500OutlinedIcon/>
          <p>{book.rating}/10</p>
        </div>

        <div className='edit'>
          <span><EditOutlinedIcon onClick={toggleEdit}/></span>
          <span><DeleteOutlineOutlinedIcon onClick={handleDelete}/></span>
          
        </div>
        </>
        }

      </div>
      

    </div>

    <p className='bookTitle'>{book.name}</p>

    </div>




    <div id='bookEdit' ref={editRef}>

      <div className='top' >
        <h1>Edit Book</h1>
        <CloseIcon onClick={toggleEdit}/>
      </div>

      <div className='wrapper' >

        <div className='col'>

        <label>Name</label>
        <input defaultValue = {book.name} ref={nameRef} type='text'  ></input>
        
        <label>Author</label>
        <input defaultValue = {book.author} ref={authoreditRef} type='text' ></input>

        <label>Type</label>
        <select id="type" ref={editTypeRef}>
        <option value="book">Book</option>
        <option value="webnovel">Webnovel</option>
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
        <option value="manhwa">Manhwa</option>
        <option value="manhua">Manhua</option>
        <option value="movie">Movie</option>
      </select>


      <button onClick={handleEdit} className='add-btn'>save</button> 

        </div>

        <div className='col'>

        <label className=''>Genre: </label>
      <select id="genre" ref={editGenreRef} multiple>
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

      <label className=''>Status: </label>
      <select id="status" ref={editStatusRef}>
        <option value="current">Current</option>
        <option value="completed">Completed</option>
        <option value="marinating">Marinating</option>
      </select>

      <label className=''>Rating: </label>
      <input type='number' min="0" max="10" ref={editRatingRef}></input>

         
      <button onClick={toggleEdit} className='add-btn'>cancel</button>



        </div>

      </div>

      </div> 

  

    </>

  )
}
