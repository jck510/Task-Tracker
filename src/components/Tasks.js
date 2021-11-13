import Task from './Task';

const Tasks = ({
  tasks,
  onDelete,
  onToggle,
  onEdit,
  setCurrentEditTask,
  setIsInEditingState,
  setTasks,
}) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
          setCurrentEditTask={setCurrentEditTask}
          setIsInEditingState={setIsInEditingState}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
    </>
  );
};

export default Tasks;
