import React, { useState } from "react";

let ids = [];
let profIds = [];
const TaskCard = function(props){
    const [source, setSource] = useState("/assets/circle.svg");
    const [striked, setStriked] = useState(false);
    const completeTask = function(){
        if(source==="/assets/circle.svg"){
            setStriked(true);
            setSource("/assets/checked.svg");
            if(!ids.includes(props.id))ids.push(props.id);
        }
        else if(source==="/assets/checked.svg"){
            setStriked(false);
            setSource("/assets/circle.svg");  
        }
    }
    // console.log(ids);
    return(
        <div className='card'>
            <div className="main-content-card">
                <img src={source} alt="" onClick={completeTask}/>
                <div className="task-name" style={striked?{textDecoration:"line-through",color:"gray"}:{textDecoration:"none",color:"black"}}>
                    {props.task}
                </div>
                <img src="/assets/delete.svg" alt="" onClick={props.deleteTask}/>
            </div>
            <hr/>
        </div>
    );
}
export default TaskCard;
export {ids};