import React, { useState } from 'react';
import { v4 } from 'uuid';
import "../style.css";
import Nav from "./Nav"
import AddTaskSection from "./AddTaskSection"
import TaskCard from "./TaskCard"
import Counter from "../hooks/Counter"
import GetSize from "../hooks/GetSize"
import DigitalClock from "../hooks/DigitalClock"
import ComponentA from "../hooks/ContextHook"
import RefHook from "../hooks/RefHook"
import StopWatch from "../hooks/StopWatch"
const App = function () {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const [profTasks, setProfTasks] = useState([]);
    const [newProfTask, setNewProfTask] = useState('');
    
    const [isPersonal, setIsPersonal] = useState(true);
    const [persClass, setPersClass] = useState("shown");
    const [profClass, setProfClass] = useState("");
    const [completedTasks, setCompletedTasks] = useState([]);
    const [completedProfTasks, setCompletedProfTasks] = useState([]);

    console.log('App Rendered');
    // ADD TASK LOGIC
    const addTask = () => {
        if (isPersonal) {
            if (newTask.trim() !== '') {
                setTasks([...tasks, {
                    id: v4(),
                    name: newTask,
                }]);
                setNewTask('');
            }
        } else {
            if (newProfTask.trim() !== '') {
                setProfTasks([...profTasks, {
                    id: v4(),
                    name: newProfTask,
                }]);
                setNewProfTask('');
            }
        }
    }
    // DELETE TASK LOGIC
    const deleteTask = (id) => {
        if (isPersonal) {
            setTasks(tasks.filter((task) => task.id !== id));
        } else {
            setProfTasks(profTasks.filter((profTask) => profTask.id !== id));
        }
    }
    // DELETE ALL COPLETED TASKS
    const removeAllComplete = () => {
        if (isPersonal){
            setCompletedTasks([]);
            const updatedTasks = tasks.filter((task) => !completedTasks.includes(task.id));
            setTasks(updatedTasks);
            console.log("Personal Tasks", tasks);
        }
        else{
            setCompletedProfTasks([]);
            const updatedProfTasks = profTasks.filter((profTask) => !completedProfTasks.includes(profTask.id));
            setProfTasks(updatedProfTasks);
            console.log("Professional Tasks", profTasks);
        }
    }
    const showPers = () => {
        setIsPersonal(true);
        setPersClass("shown");
        setProfClass("");
    };
    const showProf = () => {
        setIsPersonal(false);
        setPersClass("");
        setProfClass("shown");
    }
    return ( 
        <div>
            {
            /* <StopWatch />
            <RefHook/>
            <ComponentA/>
            <DigitalClock />
            <GetSize />
            <Counter />*/
            }
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
                                completed={isPersonal ? completedTasks : completedProfTasks}
                                setCompleted={isPersonal ? setCompletedTasks : setCompletedProfTasks}
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
                                completed={isPersonal ? completedTasks : completedProfTasks}
                                setCompleted={isPersonal ? setCompletedTasks : setCompletedProfTasks}
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