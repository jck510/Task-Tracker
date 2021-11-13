import { useState, useEffect } from 'react';
import Header from './components/Header';
import Task from './components/Task';
import AddTaskForm from './components/AddTask';
import Button from './components/interactive/Button';

import {
  toggleReminder,
  deleteTask,
  addTask,
  editTask,
  clearAllTasks,
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
      {showAddTask && <AddTaskForm onAdd={addTask} setTasks={setTasks} />}

      {/* A Clear All Tasks Feature */}
      {tasks.length > 0 && (
        <Button
          color={'black'}
          text={'Clear Tasks'}
          onClick={() => clearAllTasks(setTasks)}
        />
      )}

      {/* Show All Tasks */}
      {tasks.length > 0
        ? tasks.map((task) => {
            return (
              <>
                <Task
                  task={task}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                  onEdit={editTask}
                  setCurrentEditTask={setCurrentEditTask}
                  setIsInEditingState={setIsInEditingState}
                  setTasks={setTasks}
                  tasks={tasks}
                />
              </>
            );
          })
        : 'No Tasks to Show'}
    </div>
  );
};

export default App;
