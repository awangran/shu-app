import React, {useRef} from 'react'

export default function Book( {book, deleteBook, deleteItemById, editName} ) {
    function handleDelete() {
        deleteItemById(book.id)
    }

     function toggleEdit() {
        const btn = settingRef.current
        
        if (btn.className === "block") {
            btn.className = "hidden"
        } else {
            btn.className = "block"
        }
    } 

    const nameRef = useRef()
    const authoreditRef = useRef()
    const settingRef = useRef()

    const handleEdit = (event) => {
        const newName = nameRef.current.value
        const newAuthor = authoreditRef.current.value

        if (newName === ''|| newAuthor === '') {
            alert('Please dont leave blanks.')
        } else {
            editName(book.id, newName, newAuthor)
        }
    }
    
  return (
    <div>
    <p>{book.name} | {book.author}</p>
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2" onClick={handleDelete}>delete</button>
      <button onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2">edit</button>

      <div ref={settingRef} className='block' >
        <label>name:</label>
        <input defaultValue = {book.name} className='border-2' ref={nameRef} type='text'  ></input>
        
        <label>author:</label>
        <input defaultValue = {book.author} className='border-2' ref={authoreditRef} type='text' ></input>


        
        
        <button onClick={handleEdit} className='bg-blue-500 over:bg-blue-700 text-white py-1 px-2 rounded m-2'>save</button> 

        <button onClick={toggleEdit} className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2'>cancel</button> 
      </div>
    </div>

  )
}
