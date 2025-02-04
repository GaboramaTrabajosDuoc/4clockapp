// src/templates/DailyTasks.jsx
import React, { useState } from "react";
import "../css/DailyTasks.css";
import Modal from "react-modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  createId, getPriorityColor, sortByPriority, handleAddTask, deleteTask,
  markTaskAsDone, handlePriorityChange, onDragEnd, handleUpdateTask, handleEditTask
} from '../js/taskFunctions';

const DailyTasks = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState('');
  const [priority, setPriority] = useState("");

  const completedTasksCount = tasks.filter(task => task.done).length;
  const totalTasksCount = tasks.length;
  const completionRate = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;
  const visibleTasks = tasks.filter(task => !task.done);

{/*html CODE -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

  return (
    <div className="body">
      <header>
        <div className="logo">4'🕓</div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${completionRate}%` }}>
            <span>{Math.round(completionRate)}%</span>
          </div>
        </div>
        {tasks.length >= 2 && <button className="order" onClick={() => sortByPriority(tasks, setTasks)}>Order by priority</button>}
      </header>

    <DragDropContext onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}>
      <Droppable droppableId="list">
      {(provided) => (
        <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.filter(task => !task.done).map((task, index) => (  // Asegúrate de cambiar esto según tu lógica para determinar tareas activas
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <li
                  className="task"
                  key={task.id}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                  ...provided.draggableProps.style,
                  backgroundColor: getPriorityColor(task.priority),
                }}
              >
                <span
                  className={"task-number" + (task.done ? " completed" : "")}
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {index + 1}){" "}
                </span>
                <span
                  className={"task-text" + (task.done ? " completed" : "")}
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.text}
                </span>

                <p className="task-description" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                  {task.description}
                </p>

                <ul
                  className="task-buttons"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  <button className="delete" onClick={() => deleteTask(task.id, tasks, setTasks)}>
                    Delete
                  </button>
                  <button className="done" onClick={() => markTaskAsDone(task.id, tasks, setTasks)}> 
                    Done
                  </button>

                  <button className="edit" onClick={() => handleEditTask(task, setEditingTask, setNewTask, setDescription, setPriority, setTaskDate, setModalIsOpen)}>
                    Edit
                  </button>
                </ul>
              </li>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    )}
    </Droppable>
  </DragDropContext>

      <footer>
        <nav>
          <ul className="footer-nav-links">
            <a className="cta" href="#">
              <button> Daily Tasks</button>
            </a>
            <a className="cta" href="#">
              <button> Power Lists</button>
            </a>
            <li>
              <a className="add-button" onClick={() => setModalIsOpen(true)}>
                <button>
                  <span>+ NEW TASK</span>
                </button>
              </a>
            </li>
            <a className="cta" href="#">
              <button>Reminders</button>
            </a>
            <a className="cta" href="#">
              <button>Calender</button>
            </a>
          </ul>
        </nav>
      </footer>

  <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="add-task-modal">
    <div className="to-do-list">
      <h1>{editingTask ? "Edit Task" : "Add Task"}</h1>
        <div className="add-modal">
          <input className="input-container" type="text" placeholder="Enter a task..." value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
          <input className="input-container-desc" type="text" placeholder="Enter description..." value={description} onChange={(e) => setDescription(e.target.value)}/>
          <input className="input-container" type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} placeholder="Select a date..."/>
      <select className="input-container" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">Level of Priority</option>
        <option value="Must">Must</option>
        <option value="Should">Should</option>
        <option value="Could">Could</option>
        <option value="Would">Would</option>
      </select>
    </div>
    <button className="close" onClick={() => setModalIsOpen(false)}>
      Close
    </button>
    {editingTask ? (
      <button className="save" onClick={() => handleUpdateTask(newTask, description, priority, taskDate, editingTask, tasks, setTasks, setModalIsOpen)}> 
        Save Changes
      </button>
    ) : (
      <button className="add" onClick={() => handleAddTask(newTask, description, priority, taskDate, tasks, setTasks, setModalIsOpen)}> 
        ADD
      </button>
    )}
  </div>
</Modal>
    </div>
  );
};

export default DailyTasks;