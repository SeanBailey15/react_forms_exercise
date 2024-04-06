import React from "react";
import './Box.css'

const Box = ({id, width, height, color, removeBox}) => {
    const handleRemove = () => {
        removeBox(id)
    };

    return (
        <div className="Box">
            <button className="Box-btn" type="submit" onClick={handleRemove} style={{display: "inline-block"}}>X</button>
            <div className="Box-div" data-testid="box" style={{width: width, height: height, backgroundColor: color}}></div>
        </div>
    )
}

export default Box