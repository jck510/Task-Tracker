import { useState, useEffect } from 'react';
import Header from './components/Header';
import Task from './components/Task';
import AddTaskForm from './components/AddTask';
import Button from './components/interactive/Button';
import Modal from 'react-modal';

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

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const tasksList = JSON.parse(localStorage.getItem('tasksArray')) || [];
    setTasks(tasksList);
  }, []);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

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
                  setModalOpen={setIsOpen}
                />
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={() => setIsOpen(false)}
                  className='modal-styles'
                  contentLabel='Example Modal'
                  ariaHideApp={false}
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Task</h2>
                  <button onClick={() => setIsOpen(false)}>X</button>
                  <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                  </form>
                </Modal>
              </>
            );
          })
        : 'No Tasks to Show'}
    </div>
  );
};

export default App;
