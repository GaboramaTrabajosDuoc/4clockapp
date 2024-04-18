import React, {useEffect} from 'react';
import DailyTasks from './templates/DailyTasks';
import Modal from 'react-modal';

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