import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';

function App() {


  const [tasks,setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    var tasksList = JSON.parse(localStorage.getItem('tasksArray')) || [];
    setTasks(tasksList)
    //console.log(tasks);
  },[])
  
  /*
  const [tasks,setTasks] = useState([

    
      {
          id:1,
          text: 'Doctors Appointment',
          day: 'Feb 5th at 2:30pm',
          reminder: true,
      },
      {
          id: 2,
          text: 'Meeting at School',
          day: 'Feb 6th at 1:30pm',
          reminder: true,
      }
      

  ])
  */
  
  



// Add Task
const addTask = (task) => {
  const id = Math.floor(Math.random() * 10000) + 1

  const newTask = { id, ...task }

  const oldTasks = JSON.parse(localStorage.getItem('tasksArray')) || [];

  oldTasks.push(newTask);

  localStorage.setItem('tasksArray', JSON.stringify(oldTasks));

  setTasks(oldTasks);

}

// Delete Task
const deleteTask = (id) => {
  const delTask = tasks.filter((task) => task.id !== id);
  

  localStorage.setItem('tasksArray', JSON.stringify(delTask));

  setTasks(delTask);

}

// Toggle Reminder
const toggleReminder = (id) => {
  
  localStorage.setItem('tasksArray', JSON.stringify(tasks.map((task) => task.id === id 
  ?
  {...task, reminder: !task.reminder }
  : task)));

  setTasks(JSON.parse(localStorage.getItem('tasksArray')));

}

// && in the showAddTask line is short for a ternary with no else
  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      { tasks.length > 0 ? 
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
      : (
        'No Tasks to Show'
      )}
    </div>
  );
}

export default App;
