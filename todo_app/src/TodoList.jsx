import React, {useState} from "react";
import {v4 as uuid} from 'uuid'
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import './TodoList.css'

const TodoList = () => {
    const INITIAL_STATE = []

    const [todos, setTodos] = useState(INITIAL_STATE);

    const addTodo = (newTodo) => {
        setTodos(todos => [...todos, {...newTodo, id: uuid()}])
    }

    const removeTodo = (id) => {
       setTodos(todos.filter((todo) => todo.id !== id))     
    }

    return (
        <div className="TodoList">
            <h1 className="TodoList-h1">Let's Do This!</h1>
            <div className="TodoList-form">
                <NewTodoForm addTodo={addTodo}/>
            </div>
            <div className="TodoList-todos">
                {todos.map(({id, content}) => <Todo key={id} id={id} content={content} removeTodo={removeTodo} />)}
            </div>
        </div>
    )
}

export default TodoList;