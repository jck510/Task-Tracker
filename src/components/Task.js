import React, { useState } from 'react';
import { FaTimes, FaPen } from 'react-icons/fa';
import Modal from 'react-modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { setDate } from '../lib/helpers';

const Task = ({ task, onDelete, onToggle, onEdit, tasks, setTasks }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [currentEditTask, setCurrentEditTask] = useState({
    text: task.text,
    day: task.day,
    reminder: task.reminder,
  });
  const [isInEditingState, setIsInEditingState] = useState(false);

  const editModalProcessor = () => {
    setIsOpen(!modalIsOpen);
  };

  const handleEditTask = (e) => {
    setCurrentEditTask((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      // onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <div>
          <FaPen
            style={{ color: 'green', cursor: 'pointer' }}
            className='icon-div'
            onClick={() => {
              setIsOpen(true);
              onEdit(task, setCurrentEditTask, setIsInEditingState);
            }}
          />
          <FaTimes
            style={{ color: 'red', cursor: 'pointer', marginLeft: '12px' }}
            onClick={() => onDelete(task.id, tasks, setTasks)}
            className='icon-div'
          />
        </div>
      </h3>
      <p>{setDate(task)}</p>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => editModalProcessor()}
        className='modal-styles'
        ariaHideApp={false}
      >
        <h2>Edit Task</h2>
        <AiOutlineCloseCircle
          onClick={() => setIsOpen(false)}
          className='exit-modal-icon'
        />
        <form className='add-form'>
          {' '}
          {/*onSubmit={(e) => onSubmit(e)} */}
          <div className='form-control'>
            <label>Edit Task</label>
            <input
              type='text'
              name='text'
              placeholder='Edit Task'
              value={currentEditTask.text}
              onChange={(e) => handleEditTask(e)}
            />
          </div>
          <div className='form-control'>
            <label>Date & Time</label>
            <input
              type='datetime-local'
              name='day'
              placeholder='Add Day & Time'
              value={currentEditTask.day}
              onChange={(e) => handleEditTask(e)}
            />
          </div>
          {currentEditTask.reminder ? (
            <div
              type='submit'
              className='btn btn-block rem-btn'
              style={{ width: '11.5rem' }}
              onClick={(e) => handleEditTask(e)}
            >
              Remove Reminder
            </div>
          ) : (
            <div
              type='submit'
              className='btn btn-block rem-btn'
              onClick={(e) => handleEditTask(e)}
            >
              Set Reminder
            </div>
          )}
          <input
            type='submit'
            value='Confirm'
            className='btn btn-block'
            // onSubmit={(e) => onSubmit(e)}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Task;
