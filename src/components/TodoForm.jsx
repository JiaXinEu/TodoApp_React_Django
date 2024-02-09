import React, {useState} from 'react'
import { useEffect } from 'react'
import { useRef } from 'react';

export const TodoForm = ({addTodo}) => {
    const inputRef = useRef(null);
    const [value, setValue] = useState("")

    const handleSubmit = e => {
        e.preventDefault();
        if (value !== "") {
            addTodo(value)
            setValue("")
        }
    }

    useEffect(() => {
        inputRef.current.focus();
      }, []);

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input type='text' ref={inputRef} className='todo-input' value={value} placeholder='Add a new task' onChange={(e) => setValue(e.target.value)}/>
            <button type='submit' className='todo-btn'>Add task</button>
            </form>
    
    )
}