//templates/newAddingTasks.jsx

import React, { useState, useEffect } from 'react';
import '../css/newAddTasks.css';

function List() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [taskNumbers, setTaskNumbers] = useState([]);

    useEffect(() => {
        const updatedTaskNumbers = [];
        const updatedTasks = tasks.map((task, index) => {
            const taskId = generateUniqueId();
            updatedTaskNumbers.push(index + 1);
            return { ...task, id: taskId, position: index + 1 };
        });
        setTaskNumbers(updatedTaskNumbers);
        setTasks(updatedTasks);
    }, [tasks]);

    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(tasks => [...tasks, { text: newTask }]);
            setNewTask("");
        }
    }

    return (
        <div className='to-do-list'>
            <h1>To Do List</h1>
            <div className='add-modal'>
                <input type="text" placeholder='Enter a task...' value={newTask} onChange={handleInputChange} />
                <button onClick={addTask}>ADD</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={task.id}>{task.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default List;