import { useState } from 'react'
import './TodoList.css'

function TodoList() {
    let [taskArr,setTaskArr] = useState([])
    let [inputValue,setInputValue] = useState('')

    function handleInputChange(event){
        if(event.target.value.trim() !== ''){
            setInputValue(event.target.value)
        }
    }

    function addTask(){
        if(inputValue === ''){
            return 
        }

        let newTask = {
            id : Date.now(),
            str : inputValue
        };

        setTaskArr([...taskArr,newTask]);
        console.log(taskArr)
        setInputValue('')
    }

    function deleteTask(id){
        let updatedTaskArr = taskArr.filter(item => item.id !== id)
        setTaskArr(updatedTaskArr)
    }
    

    function handleTaskBtn(event){
        if(event.key === "Enter"){
            addTask()
        }
    }

    return (
        <div className="app-container">

            {/* Background */}
            <div className="bg-circle bg-circle-1"></div>
            <div className="bg-circle bg-circle-2"></div>

            {/* Main Content */}
            <main className="main-content">

                {/* Header */}
                <header className="header">
                    <span className="logo">✦ Taskly</span>
                    <h1 className="title">My Tasks</h1>
                    <p className="subtitle">Keep it simple</p>
                </header>

                {/* Card */}
                <div className="card">

                    {/* Input Section */}
                    <div className="input-section">
                        <input 
                            type="text" 
                            className="task-input" 
                            placeholder="Add a new task..."
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleTaskBtn}
                        />
                        <button className="add-btn"
                            onClick={addTask}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Task List */}
                    <ul className="task-list">

                        {taskArr.map(
                            task => (<li className="task-item" key={task.id}>
                                        <label className="checkbox-wrapper">
                                            <input type="checkbox" className="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <span className="task-text">{task.str}</span>
                                        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </li>)
                        )}

                    </ul>

                    {/* Footer */}
                    <div className="card-footer">
                        <span className="task-count">{taskArr.length} Tasks remaining</span>
                    </div>

                </div>

                {/* Credit */}
                <footer className="footer">
                    <p>Crafted with ♡ using React</p>
                </footer>

            </main>

        </div>
    )
}

export default TodoList