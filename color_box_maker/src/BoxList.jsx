import React, {useState} from "react";
import {v4 as uuid} from 'uuid'
import Box from './Box'
import NewBoxForm from './NewBoxForm'

const BoxList = () => {
    const INITIAL_STATE = []

    const [boxes, setBoxes] = useState(INITIAL_STATE);

    const addBox = (newBox) => {
        setBoxes(boxes => [...boxes, {...newBox, id: uuid()}])
    }

    const removeBox = (id) => {
       setBoxes(boxes.filter((box) => box.id !== id))     
    }

    return (
        <div className="BoxList">
            <h3 className="BoxList-h3">Make Some Boxes!</h3>
            <div className="BoxList-form">
                <NewBoxForm addBox={addBox}/>
            </div>
            <div className="BoxList-boxes">
                {boxes.map(({id, width, height, color}) => <Box key={id} id={id} width={Number(width)} height={Number(height)} color={color} removeBox={removeBox} />)}
            </div>
        </div>
    )
}

export default BoxList;