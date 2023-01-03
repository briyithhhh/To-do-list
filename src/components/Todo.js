import React from 'react'
import { useState } from 'react'
import Show from './Show'

export default function Todo(){
    const [title, setTitle] = useState("")
    const [todos, setTodos] = useState([])

    function handleChange(e){
        const value = e.target.value
        setTitle(value)
    }
    function handleSubmit(e){
        e.preventDefault()
        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }
        const temp = [...todos]
        temp.unshift(newTodo)

        setTodos(temp)
        setTitle("")
      }
    function handleUpdate(id, Value){
        const temp = [...todos]
        const item = temp.find((item) => item.id === id)
        item.title = Value
        setTodos(temp)
    }
    function handleDelete(id){
        const temp = todos.filter(item => item.id !== id)
        setTodos(temp)
    }

  return (
    <div className='Container'>
      <form ClassName='Form' onSubmit={handleSubmit}>
        <h1>To Do list</h1>
        <p>What you want to do today?</p>
        <input className='input' onChange={handleChange} type='text' value={title} placeholder='Enter your task'/>
        <input className='create' onClick={handleSubmit} type='submit' value="Create task"/>
      </form>

      <div className='todo-list'>
        {todos.map(item => (
          <Show key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
      </div>
    </div>
  )
}
