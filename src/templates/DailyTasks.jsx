import React, { useState } from "react";
import '../css/DailyTasks.css';
import Modal from "react-modal";
import List from "./newAddingTasks";

// Function to open modal
function popModal(setModalIsOpen) {
    setModalIsOpen(true);
}

// Function to close modal
function closeModal(setModalIsOpen) {
    setModalIsOpen(false);
}

// Component definition
const DailyTasks = () => {
    // Initialize modal state
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className="body">
            <header>
                <div className="logo">4'🕓</div>
            </header>

            <footer>
                <nav>
                    <ul className="footer-nav-links">
                        <a className="cta" href="#"><button>Daily Tasks</button></a>
                        <a className="cta" href="#"><button>Power Lists</button></a>
                        <li>
                            <a className="add-button" onClick={() => popModal(setModalIsOpen)}>
                                <button>
                                    <span>+
                                        <br/>
                                        NEW TASK
                                    </span>
                                </button>
                            </a>
                        </li>
                        <a className="cta" href="#"><button>Comunity</button></a>
                        <a className="cta" href="#"><button>Settings</button></a>
                    </ul>
                </nav>
            </footer>

            {/* Modal Code*/}
            <Modal isOpen={modalIsOpen} onRequestClose={() => closeModal(setModalIsOpen)} className="add-task-modal">
                <List/>
                <button onClick={() => closeModal(setModalIsOpen)}>Close</button>
            </Modal>
        </div>
    );
}

// Component definition for NewaddingTasks
const NewaddingTasks = () => {
    return (
        <div>
            {/* Add your content here */}
        </div>
    );
}

export default DailyTasks;