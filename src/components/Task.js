import { FaTimes, FaPen } from 'react-icons/fa';

import { setDate } from '../lib/helpers';

const Task = ({
  task,
  onDelete,
  onToggle,
  onEdit,
  setCurrentEditTask,
  setIsInEditingState,
  tasks,
  setTasks,
  setModalOpen,
}) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <div>
          <FaPen
            style={{ color: 'green', cursor: 'pointer' }}
            className='icon-div'
            onClick={() => {
              setModalOpen(true);
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
    </div>
  );
};

export default Task;
