/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import '../assets/styles/show.css'

export default function Show ({ item, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false)

  function FormEdit () {
    const [newValue, setNewValue] = useState(item.title)

    function handleSubmit (e) {
      e.preventDefault()
    }
    function handleChange (e) {
      const value = e.target.value
      setNewValue(value)
    }
    function handelClickUpdate (e) {
      onUpdate(item.id, newValue)
      setIsEdit(false)
    }

    return (
      <form className='editForm' onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newValue} />
        <button className='btn-e' id='save' onClick={handelClickUpdate}>Save✅</button>
        <button className='btn-e' id='delet' onClick={() => setIsEdit(false)}>Cancel❌</button>
      </form>
    )
  }
  function TodoElement () {
    return (
      <div className='todoInfo'>
        <ul>
          <li>{item.todo}</li>
        </ul>
        <button className='btn' id='comple'>✅</button>
        <button className='btn' id='edit' onClick={() => setIsEdit(true)}>✏️</button>
        <button className='btn' id='delete' onClick={(e) => onDelete(item.id)}>🗑️</button>
      </div>
    )
  }
  return (
    <div className='edit-todo'>
      {isEdit ? <FormEdit /> : <TodoElement />}
    </div>
  )
}
