import { useState } from 'react';
import { RiFlag2Fill } from 'react-icons/ri';

const AddTaskForm = ({ onAdd, setTasks }) => {
  const [inputState, setInputState] = useState({
    text: '',
    day: '',
    reminder: false,
  });

  const handleAddTask = (e) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(inputState, setTasks);
    setInputState({
      text: '',
      day: '',
      reminder: false,
    });
  };

  return (
    <form className='add-form' onSubmit={(e) => onSubmit(e)}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          name='text'
          placeholder='Add Task'
          value={inputState.text}
          onChange={(e) => handleAddTask(e)}
        />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='datetime-local'
          name='day'
          placeholder='Add Day & Time'
          value={inputState.day}
          onChange={(e) => handleAddTask(e)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          name='reminder'
          checked={inputState.reminder}
          value={inputState.reminder}
          onChange={(e) => handleAddTask(e)}
        />
      </div>
      <div className='flag-container' title='No Priority by Default'>
        <RiFlag2Fill className='flag-icn-adder' color='#A9333A' />
        <RiFlag2Fill className='flag-icn-adder' color='#FFB344' />
        <RiFlag2Fill className='flag-icn-adder' color='#3DB2FF' />
      </div>

      <input
        type='submit'
        value='Save Task'
        className='btn btn-block'
        onSubmit={(e) => onSubmit(e)}
      />
    </form>
  );
};

export default AddTaskForm;
