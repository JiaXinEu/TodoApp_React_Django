import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import  {v4 as uuidv4} from 'uuid';
import axios from 'axios'
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])
    const [errors, setErrors] = useState("")

    useEffect(() =>{
        axios.get("http://127.0.0.1:8000/todo/todos")
            .then(response => setTodos(response.data))
            .catch(e => setErrors(e.message));
    }, [])

 
    const addTodo = todo => {
        const originalTodos = [...todos];
        axios.post("http://localhost:8000/todo/todos", {task: todo, completed: false, isEditing: false, todoStyle: JSON.stringify(todoStyle)})
            .then(response => setTodos([...originalTodos, response.data]))
            .catch(e => {
                setErrors(e.message);
                setTodos(originalTodos);
            });
    }
    

    const toggleComplete = (id) => {
        const originalTodos = [...todos];
        const todoToUpdate = todos.find(todo => todo.id === id);
        axios.put(`http://localhost:8000/todo/todos/${id}`, { ...todoToUpdate, completed: !todoToUpdate.completed })
            .then(response => {
                const updatedTodo = response.data;
                setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
            })
            .catch(e => {
                setErrors(e.message);
                setTodos(originalTodos);
            });
        ;
    
    }


    const deleteTodo = id => {
        setTodos(todos.filter(todo =>
            todo.id !== id))
        const originalTodos = [...todos]
        axios.delete("http://127.0.0.1:8000/todo/todos/"+id)
            .then()
            .catch(e => {
                setErrors(e.message)
                setTodos(originalTodos)
            })
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, isEditing: !todo.isEditing} : todo
        ))
    }

    const editTask = (task, id) => {
        const originalTodos = [...todos];
        const todoToUpdate = todos.find(todo => todo.id === id)
        axios.patch(`http://localhost:8000/todo/todos/${id}`, { ...todoToUpdate, task, isEditing: !todoToUpdate.isEditing})
            .then(response => {
                const updatedTodo = response.data;
                setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
            })
            .catch(e => {
                setErrors(e.message);
                setTodos(originalTodos);
            });
    }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    
    const todoStyle = {
        background: getRandomColor(),
        padding: '10px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
      };

    return (
        <div className='TodoWrapper'>
            {errors && <p>{errors}</p>}
            <h1>To-do List</h1>
            <TodoForm addTodo={addTodo}/>
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo}/>
                ) : 
                (<Todo task={todo} key={index} 
                toggleComplete={toggleComplete}
                deleteTodo = {deleteTodo}
                editTodo = {editTodo}/>
                )
            ))}
        </div>
    )
}