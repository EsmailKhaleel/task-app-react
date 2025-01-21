import React, { useState } from 'react';
import { v4 } from 'uuid';
import "../style.css";
import Nav from "./Nav"
import AddTaskSection from "./AddTaskSection"
import TaskCard, { ids } from "./TaskCard"
const App = function () {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [profTasks, setProfTasks] = useState([]);
    const [newProfTask, setNewProfTask] = useState('');
    const [isPersonal, setIsPersonal] = useState(true);
    const [persClass, setPersClass] = useState("shown");
    const [profClass, setProfClass] = useState("");
    // ADD TASK LOGIC
    const addTask = () => {
        if(isPersonal){
            if (newTask.trim() !== '') {
                setTasks([...tasks, {
                    id: v4(),
                    name: newTask,
                }]);
                setNewTask('');
            }
        }else{
            if (newProfTask.trim() !== '') {
                setProfTasks([...profTasks, {
                    id: v4(),
                    name: newProfTask,
                }]);
                setNewProfTask('');
            }
        }
        console.log("Personal Tasks",tasks,"Professional Tasks",profTasks );
    }
    // DELETE TASK LOGIC
    const deleteTask = (id) => {
        if(isPersonal){
        setTasks(tasks.filter((task) => task.id !== id));
        }else{
        setProfTasks(profTasks.filter((profTask) => profTask.id !== id));
        }
    }
    // DELETE ALL COPLETED TASKS
    const removeAllComplete = () => {
        if(isPersonal)
        setTasks(tasks.filter((task) => !ids.includes(task.id)));
        else
        setProfTasks(profTasks.filter((profTask) => !ids.includes(profTask.id)));
    }
    const showPers = ()=> {
        setIsPersonal(true);
        setPersClass("shown");
        setProfClass("");
    };
    const showProf = ()=> {
        setIsPersonal(false);
        setPersClass("");
        setProfClass("shown");
    }
    return (
        <div>
            <Nav />
            <div className='pers-prof'>
                <div onClick={showPers} className={persClass}>PERSONAL</div>
                <div onClick={showProf} className={profClass}>PROFESSIONAL</div>
            </div>
            {isPersonal ?
                (<>
                    <AddTaskSection
                        onChange={(e) => {
                            setNewTask(e.target.value);
                        }}
                        addTask={addTask}
                        newTask={newTask}
                    />
                    <div className='task-container'>
                        {tasks.map((taskStateObject) => (
                            <TaskCard
                                id={taskStateObject.id}
                                key={taskStateObject.id}
                                task={taskStateObject.name}
                                deleteTask={() => deleteTask(taskStateObject.id)}
                            />
                        ))}

                        <div id='clear-wrapper'>
                            <img src="/assets/clear.svg" alt="" />
                            <div onClick={removeAllComplete}>Clear Completed</div>
                        </div>
                    </div>
                </>)
                :
                (<>
                    <AddTaskSection
                        onChange={(e) => {
                            setNewProfTask(e.target.value);
                        }}
                        addTask={addTask}
                        newTask={newProfTask}
                    />
                    <div className='task-container'>
                        {profTasks.map((taskStateObject) => (
                            <TaskCard
                                id={taskStateObject.id}
                                key={taskStateObject.id}
                                task={taskStateObject.name}
                                deleteTask={() => deleteTask(taskStateObject.id)}
                            />
                        ))}

                        <div id='clear-wrapper'>
                            <img src="/assets/clear.svg" alt="" />
                            <div onClick={removeAllComplete}>Clear Completed</div>
                        </div>
                    </div>
                </>)
            }
        </div>
    )
}


export default App;