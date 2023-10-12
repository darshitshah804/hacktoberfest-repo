import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../constants';
import { useNavigate } from 'react-router';
import TodoList from './TodoList'
import ShimmerTodoList from './ShimmerTodoList'

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {

    const isLoggedIn = !!localStorage.getItem('token');

    if (!isLoggedIn) {
      // If the user is not logged in, navigate them to the login page
      navigate('/login');
    }  

    fetchTodos();
  }, []); 

  const fetchTodos = async () => {    
    try {
      const response = await fetch(`${BASE_URL}/api`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTodos(data.todo);
        setLoading(false);
      } else {
        console.error('Failed to fetch to-dos');
      }
    } catch (error) {
      console.error('Error fetching to-dos:', error);
    }
  };
  
  const handleAddTodo = async () => {
    setLoading(true)
    if (newTodo.trim() === '') {
      return;
    }    

    try {
      const response = await fetch(`${BASE_URL}/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ todoName: newTodo }),
      });
  
      if (response.ok) {                  
        fetchTodos();
      } else {
        console.error('Failed to update to-do status');
      }
    } catch (error) {
      console.error('Error toggling to-do status:', error);
    }

    setNewTodo('');
  };

  const onDeleteTodo = async (todoId) => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/api/${todoId}`, {
        method: 'DELETE',
        headers: {          
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },        
      });
  
      if (response.ok) {                  
        fetchTodos();
      } else {
        console.error('Failed to update to-do status');
      }
    } catch (error) {
      console.error('Error toggling to-do status:', error);
    }
  };

  const handleToggleComplete = async (todoId) => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/api/${todoId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {                  
        fetchTodos();
      } else {
        console.error('Failed to update to-do status');
      }
    } catch (error) {
      console.error('Error toggling to-do status:', error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('token')
    navigate('/login')
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-indigo-500 p-6 rounded-lg shadow-md w-1/2">
        <h2 className="text-3xl font-semibold text-white mb-6">To-Do List</h2>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full mb-4 md:mr-2">
            <input
              type="text"
              placeholder="Add a new to-do"
              className="w-full p-2 rounded bg-indigo-100 text-indigo-700"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </div>
          <div className="w-1/4 mb-4 flex items-center">
            <button
              onClick={handleAddTodo}
              className="w-full bg-indigo-200 text-indigo-700 py-2 px-2 rounded hover:bg-indigo-700 hover:text-white transition-colors"
            >
              Add
            </button>
          </div>
        </div>
        {loading ? (
          <ShimmerTodoList />
        ) : (
          <TodoList
            todos={todos}
            onDeleteTodo={onDeleteTodo}
            onToggleComplete={handleToggleComplete}
          />
        )}
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
  
};

export default Home;
