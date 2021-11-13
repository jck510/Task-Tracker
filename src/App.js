import { useState, useEffect } from 'react';
import Header from './components/Header';
import Task from './components/Task';
import AddTaskForm from './components/AddTask';
import Button from './components/interactive/Button';
import Modal from 'react-modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';

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
                  ariaHideApp={false}
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Task</h2>
                  <AiOutlineCloseCircle
                    onClick={() => setIsOpen(false)}
                    className='exit-modal-icon'
                  />
                  <form className='add-form'>
                    {' '}
                    {/*onSubmit={(e) => onSubmit(e)} */}
                    <div className='form-control'>
                      <label>Task</label>
                      <input
                        type='text'
                        name='text'
                        placeholder='Add Task'
                        // value={inputState.text}
                        // onChange={(e) => handleAddTask(e)}
                      />
                    </div>
                    <div className='form-control'>
                      <label>Day & Time</label>
                      <input
                        type='datetime-local'
                        name='day'
                        placeholder='Add Day & Time'
                        // value={inputState.day}
                        // onChange={(e) => handleAddTask(e)}
                      />
                    </div>
                    <input
                      type='submit'
                      value='Set Reminder'
                      className='btn btn-block rem-btn'
                      // onSubmit={(e) => onSubmit(e)}
                    />
                    <input
                      type='submit'
                      value='Confirm'
                      className='btn btn-block'
                      // onSubmit={(e) => onSubmit(e)}
                    />
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
