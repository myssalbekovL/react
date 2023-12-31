import './App.css';
import Modal from './components/Modal/Modal';
import { useState } from 'react';
import List from './components/List/List';


const initialTasks = [
    {
      id: 1,
      title: "HTML",
      completed: false
    },
    {
      id: 2,
      title: "CSS",
      completed: false
    },
    {
      id: 3,
      title: "JS",
      completed: false
    },
    {
      id: 4,
      title: "REACT",
      completed: false
    }
  ]

function App() {
  const [show, setShow] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState(initialTasks);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState('');
  const handleOpen = () => {
    setShow(!show)
  }

  const handleTextInput = (event) => {
    setNewTask(event.target.value)
  }

  const handleAdd = () => {
    setTasks((prevState)=>[...prevState, {
      id: tasks[tasks.length-1].id+1,
      title:newTask,
      completed: false
    }
    ])
  }
  const handleDelete = (id) => {
    const result = tasks.filter((todo) => todo.id !== id);
    const result2 = searchResult.filter((todo) => todo.id !== id);
    setTasks(result)
    setSearchResult(result2)
  }

  const handleSearch = ({target}) => {
    const value = target.value;
    setSearch(value)
    const result = tasks.filter((task) =>
      task.title.toLocaleLowerCase().includes(value.toLowerCase()));
    setSearchResult(result);
  };

  return (
    <div className="App">
      <input type="search" value={search} onChange={handleSearch}/>
      <button className='btn' onClick={handleOpen}>Открыть</button>
      {show &&
        <Modal
          handleOpen={handleOpen}
          handleTextInput={handleTextInput}
          handleAdd={handleAdd}
        />
      }
      {search.length && !searchResult.length && 'not found' || null}
      <List tasks={search.length ? searchResult : tasks} handleDelete={handleDelete}/>
    </div>
  )
}



// function addTask(task) {
//     let taskElement = document.createElement('div');
//     taskElement.className = 'task';
//     taskElement.textContent = task.text;
//
//     if (task.completed) {
//         taskElement.classList.add('completed');
//     }
//
//     document.body.appendChild(taskElement);
// }
//
//
//
// export default App;
