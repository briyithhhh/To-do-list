import React from "react"
import { useState } from "react"

export default function Show({ item, onUpdate, onDelete }) {

  const [isEdit, setIsEdit] = useState(false)

  function FormEdit() {
    const [newValue, setNewValue] = useState(item.title)

    function handleSubmit(e) {
      e.preventDefault()
    }
    function handleChange(e) {
      const value = e.target.value
      setNewValue(value)
    }
    function handelClickUpdate(e) {
      onUpdate(item.id, newValue)
      setIsEdit(false)
    }

    return (
      <form className="editForm" onSubmit={handleSubmit}>
        <input type="text" className="todoInput" onChange={handleChange} value={newValue}/>
        <button className='save' onClick={handelClickUpdate}>Save✅</button>
        <button className='cancel' onClick={() => setIsEdit(false)}>Cancel</button>
      </form>
    )
  }
  function TodoElement(){
    return(
      <div className="todoInfo">
          {item.title} 
          <button className='complete'>Complete</button>
          <button className='edit'onClick={() => setIsEdit(true)} >Edit</button>
          <button className='delete' onClick={(e) => onDelete(item.id)} >Delete</button>
        </div>
    )
  }
  return (
    <div className="edit-todo">
      {isEdit ? <FormEdit /> : <TodoElement />}
    </div>
  )
}