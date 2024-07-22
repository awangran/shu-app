import React, {useRef} from 'react'

export default function Book( {book, deleteBook, deleteItemById, editName} ) {
    function handleDelete() {
        deleteItemById(book.id)
    }

     function toggleEdit() {
        const btn = settingRef.current
        btn.className = (btn.className === "block") ? "hidden" : "block";
    } 

    const nameRef = useRef()
    const authoreditRef = useRef()
    const settingRef = useRef()
    const editTypeRef = useRef()
    const editGenreRef = useRef()
    const editStatusRef = useRef()
    const editRatingRef = useRef()
    

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
    
  return (
    <div>
    <p>{book.name} | {book.author} | {book.type} | {book.genre} | {book.status} | {book.rating} </p>
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2" onClick={handleDelete}>delete</button>
      <button onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2">edit</button>

      <div ref={settingRef} className='hidden' >
        <label>name:</label>
        <input defaultValue = {book.name} className='border-2' ref={nameRef} type='text'  ></input>
        
        <label>author:</label>
        <input defaultValue = {book.author} className='border-2' ref={authoreditRef} type='text' ></input>

        <label>type:</label>
        <select id="type" ref={editTypeRef}>
        <option value="book">Book</option>
        <option value="webnovel">Webnovel</option>
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
        <option value="manhwa">Manhwa</option>
        <option value="manhua">Manhua</option>
        <option value="movie">Movie</option>
      </select>

      <label className='text-sky-400'>Genre: </label>
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

      <label className='text-sky-400'>Status: </label>
      <select id="status" ref={editStatusRef}>
        <option value="current">Current</option>
        <option value="completed">Completed</option>
        <option value="marinating">Marinating</option>
      </select>

      <label className='text-sky-400'>Rating: </label>
      <input type='number' min="0" max="10" ref={editRatingRef}></input>


        
        
        <button onClick={handleEdit} className='bg-blue-500 over:bg-blue-700 text-white py-1 px-2 rounded m-2'>save</button> 

        <button onClick={toggleEdit} className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2'>cancel</button> 
      </div>
    </div>

  )
}
