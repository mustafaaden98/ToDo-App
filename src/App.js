import logo from './logo.svg';
import TodoList from './components/Todo/TodoList';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(''); // Name of the user
  useEffect(() => {
    let name = prompt("Please enter your name");
    setUser(name);
  },[])
  return (
    <div>
      <div className = "header">
        <span>Todo Lists</span>
        {user && <span className = "user-name"> User: {user}</span>}
      </div>
      <TodoList />
    </div>
  );
}

export default App;
