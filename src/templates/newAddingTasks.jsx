import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import '../css/newAddTasks.css';

export function List() { // Export List as named export
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
                <li key={task.id}>
                    <span className="task-number">{task.position}) </span>
                    <span className="task-text">{task.text}</span>
                </li>
            ))}
            </ul>
        </div>
    );
}
