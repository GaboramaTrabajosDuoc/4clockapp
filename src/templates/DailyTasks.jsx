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
  const [menuOpen, setMenuOpen] = useState(false);

  const completedTasksCount = tasks.filter(task => task.done).length;
  const totalTasksCount = tasks.length;
  const completionRate = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

{/*html CODE -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

return (
  <div className="body">
<header>
  <div id="menuToggle">
    {/* Botón del menú hamburguesa */}
    <button
      className="menu-icon"
      onClick={() => {
        const newState = !menuOpen;
        setMenuOpen(newState);
      }}
    >
      4'🕓 {/* Puedes usar un ícono o emoji, o reemplazar por un SVG si prefieres */}
    </button>

    {/* Menú hamburguesa */}
    <nav className={menuOpen ? "menu open" : "menu"}>
      <ul>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Daily Tasks</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Power Lists</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Reminders</a></li>
        <li><a href="#" onClick={() => setMenuOpen(false)}>Calendar</a></li>
      </ul>
    </nav>

    {/* Overlay que cierra el menú al hacer clic fuera */}
    <div
      className={`menu-overlay ${menuOpen ? "visible" : ""}`}
      onClick={() => {
        setMenuOpen(false);
      }}
    ></div>
  </div>

  {/* Barra de progreso */}
  <div className="progress-bar-container">
    <div className="progress-bar" style={{ width: `${completionRate}%` }}>
      <span>{Math.round(completionRate)}% XP</span>
    </div>
  </div>

  {/* Botón de orden por prioridad */}
  {tasks.length >= 2 && (
    <button className="order" onClick={() => sortByPriority(tasks, setTasks)}>
      Order by Priority
    </button>
  )}
</header>


<DragDropContext onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}>
  <Droppable droppableId="list">
    {(provided) => (
      <div className="task-list-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "12vh" }}>
        <ul className="list" {...provided.droppableProps} ref={provided.innerRef} style={{ width: "100%" }}>
          {tasks.filter(task => !task.done).map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <li
                  className="task"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    backgroundColor: getPriorityColor(task.priority),
                  }}
                >
                  <span className={"task-number" + (task.done ? " completed" : "")} style={{ backgroundColor: getPriorityColor(task.priority) }}>
                    {index + 1}){" "}
                  </span>
                  <span className={"task-text" + (task.done ? " completed" : "")} style={{ backgroundColor: getPriorityColor(task.priority) }}>
                    {task.text}
                  </span>
                  <p className="task-description" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                    {task.description}
                  </p>
                  <div className="task-buttons" style={{ backgroundColor: getPriorityColor(task.priority), height: "4rem", width: "1vw", display: "flex", justifyContent: "flex-end", margin: "5px", right: "20px" }}>
                    <button className="delete" onClick={() => deleteTask(task.id, tasks, setTasks)}>Delete</button>
                    <button className="done" onClick={() => markTaskAsDone(task.id, tasks, setTasks)}>Done</button>
                    <button className="edit" onClick={() => handleEditTask(task, setEditingTask, setNewTask, setDescription, setPriority, setTaskDate, setModalIsOpen)}>Edit</button>
                  </div>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
        
        {/* The button is now inside the container and moves with the tasks */}
        <button className="add-task" onClick={() => {
          setEditingTask(null);
          setNewTask("");
          setDescription("");
          setTaskDate("");
          setPriority("");
          setModalIsOpen(true)}}>+</button>
      </div>
    )}
  </Droppable>
</DragDropContext>

      
<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="add-task-modal">
  <div className="modal-content">
    <h1>{editingTask ? "Edit Task" : "Add Task"}</h1>
    
    <input 
      type="text" 
      placeholder="Task name..." 
      value={newTask} 
      onChange={(e) => setNewTask(e.target.value)} 
    />

    <input 
      type="text" 
      placeholder="Description..." 
      value={description} 
      onChange={(e) => setDescription(e.target.value)} 
    />

    <input 
      type="date" 
      value={taskDate} 
      onChange={(e) => setTaskDate(e.target.value)} 
    />

    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
      <option value="">Priority</option>
      <option value="Must">Must</option>
      <option value="Should">Should</option>
      <option value="Could">Could</option>
      <option value="Would">Would</option>
    </select>

    <div className="modal-buttons">
      <button className="close-button" onClick={() => setModalIsOpen(false)}>Close</button>
      {editingTask ? (
        <button 
          className="save-button" 
          onClick={() => handleUpdateTask(newTask, description, priority, taskDate, editingTask, tasks, setTasks, setModalIsOpen)}
        >
          Save
        </button>
      ) : (
        <button 
          className="add-button" 
          onClick={() => handleAddTask(newTask, description, priority, taskDate, tasks, setTasks, setModalIsOpen)}
        >
          Add Task
        </button>
      )}
    </div>
  </div>
</Modal>

    </div>
  );
};

export default DailyTasks;