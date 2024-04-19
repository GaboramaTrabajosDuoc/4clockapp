import React, { useState } from "react";
import '../css/DailyTasks.css';
import Modal from "react-modal";

// Function to open modal
function popModal(setModalIsOpen) {
    setModalIsOpen(true);
}

// Function to close modal
function closeModal(setModalIsOpen) {
    setModalIsOpen(false);
}

const DailyTasks = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [newTask, setNewTask] = useState("");

    const addTask = (newTask) => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, done: false }]); // Add new task with done status set to false
            setModalIsOpen(false);
        }
    };

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
            setTasks(updatedTasks);
        }
    };

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    const markTaskAsDone = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = true; 
        setTasks(updatedTasks);
        setCompletedCount(completedCount + 1); 
        deleteTask(index); 
    };

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    return (
        <div className="body">
            <header>
                <div className="logo">4'🕓</div>
                <div className="score">Score: {completedCount}</div> {/* Display the score */}
            </header>

            <ul className="list">
                {tasks.map((task, index) => (
                    <li className="task" key={index}>
                        <span className="task-number">{index + 1}) </span>
                        <span className={"task-text" + (task.done ? " completed" : "")}>{task.text}</span>
                        <ul className="task-buttons">
                            <button className="button-move" onClick={() => moveTaskUp(index)}>⬆</button>
                            <button className="button-move" onClick={() => moveTaskDown(index)}>⬇</button>
                            <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
                            <button className="done" onClick={() => markTaskAsDone(index)}>Done</button>
                        </ul>
                    </li>
                ))}
            </ul>

            <footer>
                <nav>
                    <ul className="footer-nav-links">
                        <a className="cta" href="#"><button> Daily Tasks</button></a>
                        <a className="cta" href="#"><button> Power Lists</button></a>
                        <li>
                            <a className="add-button" onClick={() => setModalIsOpen(true)}>
                                <button>
                                    <span>+
                                        <br/>
                                        NEW TASK
                                    </span>
                                </button>
                            </a>
                        </li>
                        <a className="cta" href="#"><button>Reminders</button></a>
                        <a className="cta" href="#"><button>Calender</button></a>
                    </ul>
                </nav>
            </footer>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="add-task-modal">
                <div className='to-do-list'>
                    <h1>To Do List</h1>
                    <div className='add-modal'>
                        <input type="text" placeholder='Enter a task...' value={newTask} onChange={handleInputChange} />
                        <button onClick={() => { addTask(newTask); setNewTask(""); }}>ADD</button>
                    </div>
                </div>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}

export default DailyTasks;