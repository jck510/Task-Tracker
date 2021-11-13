import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

import {
  toggleReminder,
  deleteTask,
  addTask,
  editTask,
} from './lib/helpers.js';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [currentEditTask, setCurrentEditTask] = useState(null);
  const [isInEditingState, setIsInEditingState] = useState(false);

  useEffect(() => {
    const tasksList = JSON.parse(localStorage.getItem('tasksArray')) || [];
    setTasks(tasksList);
  }, []);

  return (
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} setTasks={setTasks} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
          onEdit={editTask}
          setCurrentEditTask={setCurrentEditTask}
          setIsInEditingState={setIsInEditingState}
          setTasks={setTasks}
        />
      ) : (
        'No Tasks to Show'
      )}
    </div>
  );
};

export default App;
