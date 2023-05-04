import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

const Category = ({ category }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axios.get(`/categories/${category._id}/tasks`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getTasks();
  }, [category._id]);

  const addTask = async () => {
    try {
      const res = await axios.post(`/categories/${category._id}/tasks`, {
        name: newTask,
      });
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, newName) => {
    try {
      await axios.patch(`/tasks/${id}`, { name: newName });
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, name: newName } : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      const filteredTasks = tasks.filter((task) => task._id !== id);
      setTasks(filteredTasks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='category-container'>
      <div className='category'>
        <h2>{category.name}</h2>
        <ul>
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
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

export default Category;