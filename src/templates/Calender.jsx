import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { generateMatrix } from '../js/calenderFunctions';
import { getPriorityColor } from '../js/taskFunctions';
import 'tailwindcss/tailwind.css';
import "../css/Calender.css";

const Calendar = ({ tasks = [] }) => {  // Establecemos un array vacío como valor por defecto para tasks
    const [currentDate, setCurrentDate] = useState(new Date());
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const getTasksForDate = (date) => {
        console.log("Fecha actual:", format(date, 'yyyy-MM-dd'));
        return tasks.filter(task => {
            console.log("Fecha tarea:", format(new Date(task.date), 'yyyy-MM-dd'));
            return format(new Date(task.date), 'yyyy-MM-dd') === "2024-07-11";  // Cambia esta fecha por una que sepas que existe
        });
    };
    
    

    return (
        <div className="body">
            <div className="calendar-container">
                <div className="header flex justify-between items-center p-4">
                    <button onClick={prevMonth} className="prev">
                        &lt;
                    </button>
                    <div className="text-xl font-bold">
                        {format(currentDate, 'MMMM yyyy')}
                    </div>
                    <button onClick={nextMonth} className="next">
                        &gt;
                    </button>
                </div>
                <div className="days-grid grid grid-cols-7">
                    {weekdays.map((day) => (
                        <div key={day} className="day-header">
                            {day}
                        </div>
                    ))}
                    {generateMatrix(currentDate).map((date, index) => (
                        <div key={index} className="day">
                            <div className="day-number">{format(date, 'd')}</div>
                            {getTasksForDate(date).map(task => (
                                <div key={task.id} style={{ backgroundColor: getPriorityColor(task.priority) }}>
                                    {task.text}
                                </div>
                    ))}
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
