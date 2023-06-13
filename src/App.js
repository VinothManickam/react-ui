import React, { useState, useEffect } from 'react';

const ErrorFallback = () => {
  return (
    <div>
      <h2>Something went wrong.</h2>
      <p>Please try again later.</p>
    </div>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('https://flask-api-3jos.onrender.com/api/todos') // Replace with your Flask API URL
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => {
        console.error(error);
        setTodos([]); // Set an empty array in case of error
      });
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      fetch('https://flask-api-3jos.onrender.com/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      })
        .then(response => response.json())
        .then(data => {
          setTodos([...todos, data.todo]);
          setNewTodo('');
        })
        .catch(error => console.error(error));
    }
  };

  if (todos === null) {
    // Render an error boundary when todos is null
    return <ErrorFallback />;
  }

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTodo} onChange={handleInputChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
