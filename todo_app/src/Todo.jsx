import React from "react";
import './Todo.css'

const Todo = ({id, content, removeTodo}) => {
    const handleRemove = () => {
        removeTodo(id)
    };

    return (
        <div className="Todo">
            <button className="Todo-btn" type="submit" onClick={handleRemove} style={{display: "inline-block"}}>X</button>
            <div className="Todo-div" data-testid="todo">
                <p className="Todo-content">{content}</p>
            </div>
        </div>
    )
}

export default Todo