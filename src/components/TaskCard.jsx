import React, { useState } from "react";

const TaskCard = function (props) {

    const isCompleted = props.completed.includes(props.id);

    const toggleComplete = function () {
        if (isCompleted) {
            props.setCompleted(props.completed.filter((taskId) => taskId !== props.id));
        } else {
            props.setCompleted([...props.completed, props.id]);
        }
    };

    return (
        <div className='card'>
            <div className="main-content-card">
                <img src={isCompleted ? "/assets/checked.svg" : "/assets/circle.svg"} alt="" onClick={toggleComplete} />
                <div
                    className="task-name"
                    style={isCompleted ? { textDecoration: "line-through", color: "gray" } : { textDecoration: "none", color: "black" }}>
                    {props.task}
                </div>
                <img src="/assets/delete.svg" alt="" onClick={props.deleteTask} />
            </div>
            <hr />
        </div>
    );
}
export default TaskCard;
