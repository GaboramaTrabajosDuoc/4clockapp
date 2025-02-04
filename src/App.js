import React, {useEffect} from 'react';
import DailyTasks from './templates/DailyTasks';
import Calender from './templates/Calender';
import Modal from 'react-modal';
import Calendar from './templates/Calender';

function App() {
  useEffect(() => {
    // Set app element for React Modal
    Modal.setAppElement('#root');
  }, []);

  return (
    <div>
      <DailyTasks />
    </div>
  );
}

// Export the App component
export default App;