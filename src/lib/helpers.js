// Toggle Reminder
export const toggleReminder = (id, tasks, setTasks) => {
  localStorage.setItem(
    'tasksArray',
    JSON.stringify(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task,
      ),
    ),
  );

  setTasks(JSON.parse(localStorage.getItem('tasksArray')));
};

// Delete Task
export const deleteTask = (id, tasks, setTasks) => {
  const updatedTasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem('tasksArray', JSON.stringify(updatedTasks));
  setTasks(updatedTasks);
};

// Edit Task
export const editTask = (task, setCurrentEditTask, setIsInEditingState) => {
  console.log(task);
  setCurrentEditTask(task);
  setIsInEditingState(true);
};

// Add Task
export const addTask = (task, setTasks) => {
  const id = new Date().getTime().toString();
  const newTask = { id, ...task };
  const oldTasks = JSON.parse(localStorage.getItem('tasksArray')) || [];
  oldTasks.push(newTask);
  localStorage.setItem('tasksArray', JSON.stringify(oldTasks));
  setTasks(oldTasks);
};

export const clearAllTasks = (setTasks) => {
  setTasks([]);
  localStorage.removeItem('tasksArray');
};
