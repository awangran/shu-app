import React from 'react'

export default function Book( {book, deleteBook, deleteItemById, editName} ) {
    function handleDelete() {
        deleteItemById(book.id)
    }

    function toggleEdit() {
        const btn = document.getElementById('settings');
        if (btn.className === "block") {
            btn.className = "hidden"
        } else {
            btn.className = "block"
        }
    }

    function handleEdit() {
        
        //const newName = null

        //editName(book.id, newName)
    }
    
  return (
    <div>
      {book.name}
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2" onClick={handleDelete}>delete</button>
      <button onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2">edit</button>

      <div id="settings" className='hidden'>
        <input className='border-2 ' type='text'></input>
        <button className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2'>save</button> 

        <button onClick={toggleEdit} className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2'>cancel</button> 
      </div>
    </div>

  )
}
