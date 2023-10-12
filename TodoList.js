import React from 'react';

const TodoList = ({ todos, onToggleComplete, onDeleteTodo }) => {
  return (
    <div className="max-h-80 p-6 rounded-lg bg-indigo-400 overflow-y-auto scrollbar-thin">
      <ul className="text-white">
        {todos && todos?.length !== 0 ? todos?.toReversed()?.map((todo) => (
          <li key={todo._id} className="mb-2 flex items-center justify-between">
            <div className="flex items-center max-w-[80%]">
              <input
                type="checkbox"
                checked={todo.todoCompleted}
                onChange={() => onToggleComplete(todo._id)}
                className="mr-2"
              />
              <span className={`break-all ${todo.todoCompleted ? 'text-green-300 line-through' : ''}`}>
                {todo.todoName}
              </span>
            </div>
            <div>
              <button
                onClick={() => onDeleteTodo(todo._id)}
                className="text-red-200 border border-red-200 px-2 py-1 rounded hover:bg-red-400 hover:text-white"
              >
                Delete
              </button>
            </div>
          </li>
        )):
        <h1 className='text-center font-bold'> You are all done!</h1>}
      </ul>
    </div>
  );
};

export default TodoList;
