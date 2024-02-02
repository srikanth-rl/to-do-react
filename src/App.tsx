import './styles.css';
import { useState } from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function App(): JSX.Element {
  const [newItem, setNewItem] = useState<string>("");
  const [todos, setToDos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setToDos((currentToDos: Todo[]) => {
      return [
        ...currentToDos, {
          id: Math.random().toString(36).substr(2, 9),
          title: newItem,
          completed: false
        },
      ]
    });
    setNewItem("");
  };

  function toggleToDo(id: string, completed: boolean): void {
    setToDos((currentToDos: Todo[]) => {
      return currentToDos.map(todo => {
        if (todo.id === id)
          return { ...todo, completed }
        return todo
      });
    });
  }

  function deleteToDo(id: string): void {
    setToDos((currentToDos: Todo[]) => {
      return currentToDos.filter(todo => todo.id !== id);
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label>New Item</label>
          <input
            value={newItem} onChange={e => setNewItem(e.target.value)}
            type="text" id="item" />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>ToDo List</h1>
      <ul className='list'>
        {todos.length === 0 && "No ToDos"}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input type='checkbox' checked={todo.completed} onChange={e => toggleToDo(todo.id, e.target.checked)} />{todo.title}
              </label>
              <button onClick={() => deleteToDo(todo.id)} className='btn btn-danger'>Delete</button>
            </li>
          )
        })}

      </ul>
    </>
  )
}