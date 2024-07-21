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

    const inputRef = useRef()
    const settingRef = useRef()

    const handleEdit = (event) => {
        const newName = inputRef.current.value

        if (newName === '') {
            alert('Please submit a name.')
        } else {
            editName(book.id, newName)
            document.getElementById('inputId').value = ''
        }
    }
    
  return (
    <div>
      {book.name}
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2" onClick={handleDelete}>delete</button>
      <button onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2">edit</button>

      <div ref={settingRef} className='hidden' >
        <input placeholder = {book.name} id="inputId" className='border-2' ref={inputRef} type='text' onfocus="this.value=''" ></input>
        <button onClick={handleEdit} className='bg-blue-500 over:bg-blue-700 text-white py-1 px-2 rounded m-2'>save</button> 

        <button onClick={toggleEdit} className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-2'>cancel</button> 
      </div>
    </div>

  )
}
