// src/js/tasksFunctions.js

export const createId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "Must":
      return "var(--must-light)";
    case "Should":
      return "var(--should-light)";
    case "Could":
      return "var(--could-light)";
    case "Would":
      return "var(--would-light)";
    default:
      return "inherit";
  }
};

export const sortByPriority = (tasks, setTasks) => {
  const sortedTasks = tasks.slice().sort((a, b) => {
    const priorityOrder = {
      Must: 1,
      Should: 2,
      Could: 3,
      Would: 4
    };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  setTasks(sortedTasks);
};

export const handleAddTask = (newTask, description, priority, taskDate, tasks, setTasks, setModalIsOpen) => {
  if (newTask.trim() !== "") {
    const newTaskData = {
      id: createId(),
      text: newTask,
      description,
      done: false,
      priority,
      date: taskDate  
    };
    console.log("Adding new task:", newTaskData);  
    setTasks(prevTasks => [newTaskData, ...prevTasks]);
    setModalIsOpen(false);
  }
};

export const handleUpdateTask = (newTask, description, priority, taskDate, editingTask, tasks, setTasks, setModalIsOpen) => {
  if (editingTask) {
    const updatedTasks = tasks.map(task => {
      if (task.id === editingTask.id) {
        // Update the task with new values, including the new date
        const updatedTask = { ...task, text: newTask, description, priority, date: taskDate };
        console.log("Updated task: ", task);
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    setModalIsOpen(false);
  }
};

export const handleEditTask = (task, setEditingTask, setNewTask, setDescription, setPriority, setTaskDate, setModalIsOpen) => {
  console.log("setEditingTask is a function:", typeof setEditingTask === 'function');
  setEditingTask(task);
  setNewTask(task.text);
  setDescription(task.description);
  setPriority(task.priority);
  setTaskDate(task.date); 
  setModalIsOpen(true);
  
  //verificar que la tarea a sido editada 
  console.log("Editing task:", {
    id: task.id,
    newText: task.text,
    newDescription: task.description,
    newPriority: task.priority,
    newDate: task.date
  });
};


export const deleteTask = (id, tasks, setTasks) => {
  const updatedTasks = tasks.filter((task) => task.id !== id);
  setTasks(updatedTasks);
};

export const markTaskAsDone = (id, tasks, setTasks, completedCount, setCompletedCount) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, done: true };
    }
    return task;
  });
  setTasks(updatedTasks);
  if (setCompletedCount) {
    setCompletedCount(completedCount + 1);
  }
};

export const handlePriorityChange = (e, taskId, tasks, setTasks) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, priority: e.target.value };
    }
    return task;
  });
  setTasks(updatedTasks);
};

export const onDragEnd = (result, tasks, setTasks) => {
  if (!result.destination) {
    return;
  }
  const sourceIndex = result.source.index;
  const destinationIndex = result.destination.index;

  if (sourceIndex === destinationIndex) {
    return;
  }
  
  const updatedTasks = Array.from(tasks);
  const [removed] = updatedTasks.splice(sourceIndex, 1);
  updatedTasks.splice(destinationIndex, 0, removed);

  setTasks(updatedTasks);
};

export const handleInputChange = (setterFunction, event) => {
  setterFunction(event.target.value);
};
