//dailytask

import React, { useState } from "react";
import "../css/DailyTasks.css";
import Modal from "react-modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DailyTasks = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [tasks, setTasks] = useState([]);

  const createId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addTask = (newTask, description, priority) => {
    if (newTask.trim() !== "") {
      setTasks([
        { id: createId(), text: newTask, description: description, done: false, priority },
        ...tasks,
      ]);
      setModalIsOpen(false);
    }
  };

  const onDragEnd = (result) => {
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

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const markTaskAsDone = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    setCompletedCount(completedCount + 1);
    deleteTask(id);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handlePriorityChange = (e, taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, priority: e.target.value };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const getPriorityColor = (priority) => {
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

  return (
    <div className="body">
      <header>
        <div className="logo">4'🕓</div>
        <div className="score">Score: {completedCount}</div>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
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
                        <button className="delete" onClick={() => deleteTask(task.id)}>
                          Delete
                        </button>
                        <button className="done" onClick={() => markTaskAsDone(task.id)}>
                          Done
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
          <h1>To Do List</h1>
          <div className="add-modal">
            <input
              className="input-container"
              type="text"
              placeholder="Enter a task..."
              value={newTask}
              onChange={handleInputChange}
            />
            <input
              className="input-container"
              type="text"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select className="input-container" onChange={(e) => setPriority(e.target.value)}>
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
          <button
            className="add"
            onClick={() => {
              addTask(newTask, description, priority);
              setNewTask("");
              setDescription("");
              setPriority("");
            }}
          >
            ADD
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DailyTasks;
