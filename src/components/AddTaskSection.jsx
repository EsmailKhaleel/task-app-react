import React from "react";

const AddTaskSection = function(props){
    return(
        <div className="task-input">
            <input
                type="text"
                placeholder='What do you need to do?'
                onChange={props.onChange}
                value={props.newTask}
            />
            <button onClick={props.addTask}>ADD</button>
            {/* <h1>{props.newTask}</h1> */}
        </div>
    );
}
export default AddTaskSection;
