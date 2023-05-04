import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Task.css';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const res = await axios.get('http://localhost:3005/taches/getTache');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    try {
      const res = await axios.post('http://localhost:3005/taches/addTache', { name: newTask });
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, name) => {
    try {
      const res = await axios.put(`http://localhost:3005/taches/updateTache/${id}`, { name });
      const updatedTasks = tasks.map((task) =>
        task._id === id ? res.data : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
};

const deleteTask = async (id) => {
    try {
    await axios.delete(`http://localhost:3005/taches/deleteTache/${id}`);
    const filteredTasks = tasks.filter((task) => task._id !== id);
    setTasks(filteredTasks);
    } catch (err) {
    console.error(err);
    }
    };
    
    return (
    <div className='task-container'>
    <div className='task'>
    <h2>Tasks</h2>
    <ul>
    {tasks.map((task) => (
    <li key={task._id}>
    <input
    type='text'
    value={task.name}
    onChange={(e) => updateTask(task._id, e.target.value)}
    />
    <button onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
    ))}
    </ul>
    <input
    type='text'
    value={newTask}
    onChange={(e) => setNewTask(e.target.value)}
    />
    <button onClick={addTask}>Add Task</button>
    </div>
    </div>
    );
    };
    
    export default Task;