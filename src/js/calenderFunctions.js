//src/js/calenderFunctions.js

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';

export const generateMatrix = (currentDate) => {
    let matrix = [];
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    let date = startDate;
    while (date <= endDate) {
        // Adjust this to push the date format you want to display
        matrix.push(date);
        date = addDays(date, 1);
    }
    return matrix;
};