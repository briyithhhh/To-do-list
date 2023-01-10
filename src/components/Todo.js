/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
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
  const [todos, setTodos] = useState([])
  const [edit, setEdit] = useState({
    isEdit: false,
    id: null,
    title: ''
  })

  function unshift (element, last) {
    return (
      last ? [element, ...last] : [element]
    )
  }

  function handleUpdate (id, Value) {
    const temp = [...todos]
    const item = temp.filter(item => item.id === id)
    const itemFilter = temp.filter(item => item.id !== id)
    item.todo = Value
    setTodos(unshift(item, itemFilter))
    setEdit({ isEdit: false, id: null, title: '' })
  }
  function handleDelete (todoId) {
    const temp = [...todos]
    const item = temp.filter((item) => item.id !== todoId)
    setTodos(item)
  }

  return (
    <div className='Container' style={{ margin: '25vh auto' }}>
      <Formik
        initialValues={{
          id: 0,
          todo: 'adawd',
          completed: false
        }}
        validationSchema={validation}
        onSubmit={(values, actions) => {
          console.log(values)
          actions.resetForm({
            values: {
              id: todos.length + 1,
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
        {edit.isEdit
          ? (
            <div className='editForm'>
              <div className='todoInfo'>
                {todos.filter((item) => item.id === edit.id).map((item, index) => (
                  <ul key={index}>
                    <li>{item.todo}</li>
                  </ul>
                ))}
              </div>
              <p style={{ textAlign: 'center', fontSize: '20px' }}>🔽</p>
              <input
                type='text'
                className='input'
                placeholder='Enter your task'
                value={edit.title}
                onChange={(e) => setEdit({ isEdit: true, id: edit.id, title: e.target.value })}
              />
              <button className='btn-e' id='save' onClick={() => handleUpdate(edit.id, edit.title)}>Save✅</button>
              <button className='btn-e' id='delet' onClick={() => setEdit({ isEdit: false, id: null, title: '' })}>Cancel❌</button>
            </div>
            )
          : (
              todos.map((item, index) => (
                <div
                  className={`todoInfo ${item.completed ? 'completed' : ''}`}
                  key={index}
                >
                  <ul>
                    <li>{item.todo}</li>
                  </ul>
                  <button
                    className='btn'
                    id='comple'
                    onClick={() => {
                      item.completed = !item.completed
                      setTodos([...todos])
                    }}
                  >
                    ✅
                  </button>
                  <button
                    className='btn'
                    id='edit'
                    onClick={() => (setEdit({ isEdit: true, id: item.id }))}
                  >
                    ✏️
                  </button>
                  <button
                    className='btn'
                    id='delete'
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              )))}
      </div>
    </div>
  )
}
