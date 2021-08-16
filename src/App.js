import TodoList from './components/Todo/TodoList';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(''); // Name of the user
  useEffect(() => {
    let userName = JSON.parse(localStorage.getItem('userName'));
    if (!userName) {
      let name = prompt("Please enter your name");
      setUser(name);
      localStorage.setItem('userName', JSON.stringify(name));
      localStorage.setItem('todoList', JSON.stringify([]));
      localStorage.setItem('completed', JSON.stringify([]));
    } else {
      setUser(userName);
    }
  }, []);
  const _onLogout = () => {
    if (user) {
      localStorage.removeItem('userName');
      setUser('');
    } else {
      let name = prompt("Please enter your name");
      setUser(name);
      localStorage.setItem('userName', JSON.stringify(name));
      localStorage.setItem('todoList', JSON.stringify([]));
      localStorage.setItem('completed', JSON.stringify([]));
    }

  }
  return (
    <div>
      <div className="header">
        <span>Todo Lists</span>
        <div>
          {user && <span className="user-name"> User: {user}</span>}
          <button onClick={_onLogout}>{user ? 'Logout' : 'Login'}</button>
        </div>
      </div>
      <TodoList user={user} />
    </div>
  );
}

export default App;
