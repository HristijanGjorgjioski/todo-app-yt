import './App.css';
import { useState } from 'react';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [todoToEdit, setTodoToEdit] = useState({
    id: null,
    value: ''
  });

  const addTodo = (text) => {
    if (text.length <= 2) return;
    const todo = {
      value: text,
      id: Math.floor(Math.random() * 10000),
    };

    setTodos((prevState) => [...prevState, todo])
    setInputValue('');
  }

  const removeTodo = (id) => {
    if (!id) return;
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    setTodos(filteredTodos)
  }

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      return todo;
    })

    setTodos(updatedTodos);
  }

  const editTodo = () => {
    if (inputValue.length <= 2) return;
    const editedTodo = {
      id: todoToEdit.id,
      value: inputValue
    }
    setTodos((prevState) => 
      prevState.map(
        (todo) => todo.id === editedTodo.id ? editedTodo : todo
      )
    );
    setTodoToEdit({
      id: null,
      value: ''
    });
    setInputValue('');
  }

  const onEditClick = (todoToEdit) => {
    setTodoToEdit(todoToEdit)
    setInputValue(todoToEdit.value)
  }

  return (
    <div className='todo-app'>
      <h1>What's the Plan for Today?</h1>

      <TodoForm
        addTodo={addTodo}
        setInputValue={setInputValue}
        inputValue={inputValue}
        todoToEdit={todoToEdit}
        editTodo={editTodo}
      />

      {todos.map((todo) => (
        <Todo
          key={todo.id}
          value={todo.value}
          isComplete={todo.isComplete}
          id={todo.id}
          removeTodo={removeTodo}
          completeTodo={completeTodo}
          onEditClick={onEditClick}
        />
      ))}
    </div>
  );
}

export default App;
