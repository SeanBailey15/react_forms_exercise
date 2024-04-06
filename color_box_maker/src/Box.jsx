import React, {useState} from "react";

const Box = ({id, width, height, color, removeBox}) => {
    const handleRemove = () => {
        removeBox(id)
    };

    return (
        <div 
        className="Box"
        style={{width: width, height: height, backgroundColor: color}}
        >
            <button className="Box-btn" onClick={handleRemove} style={{display: "inline-block"}}>X</button>
        </div>
    )
}

export default Box