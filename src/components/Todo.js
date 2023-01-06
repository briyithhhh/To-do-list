/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import Show from './Show'
import '../assets/styles/todo.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const validation = Yup.object().shape({
  todo: Yup.string()
    .min(3, 'The task is too Short!')
    .max(50, 'The task is too Long!')
    .required('The task is required!')
})

export default function Todo () {
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState([])

  function handleChange (e) {
    const value = e.target.value
    setTitle(value)
  }
  function handleSubmit (e) {
    e.preventDefault()
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false
    }
    const temp = [...todos]
    temp.unshift(newTodo)

    setTodos(temp)
    setTitle('')
  }
  function handleUpdate (id, Value) {
    const temp = [...todos]
    const item = temp.find((item) => item.id === id)
    item.title = Value
    setTodos(temp)
  }
  function handleDelete (id) {
    const temp = todos.filter(item => item.id !== id)
    setTodos(temp)
  }

  return (
    <div className='Container' style={{ margin: '25vh auto' }}>
      <Formik
        initialValues={{
          todo: '',
          completed: false
        }}
        validationSchema={validation}
        onSubmit={(values, actions) => {
          console.log(values)
          actions.resetForm({
            values: {
              todo: '',
              completed: false
            }
          })
          const temp = [...todos]
          temp.unshift(values)
          setTodos(temp)
        }}
      >
        {({ errors, touched }) => (
          <Form className='Form'>
            <h1>To Do list</h1>
            <p>What you want to do today?</p>
            {errors.todo && touched.todo
              ? (
                <div className='error'>{errors.todo}</div>
                )
              : null}
            <Field
              onChange={handleChange}
              name='todo'
              className='input'
              type='text'
              autoComplete='off'
              placeholder='Enter your task'
            />
            <button
              className='create'
              type='submit'
            >
              Create
            </button>
          </Form>
        )}
      </Formik>

      <div className='todo-list'>
        {todos.map((item) => (
          <Show
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
