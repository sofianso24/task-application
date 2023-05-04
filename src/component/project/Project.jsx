import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './project.css';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const res = await axios.get('http://localhost:3005/projets/getProjet');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addProject = async () => {
    try {
      const res = await axios.post('http://localhost:3005/projets/addProjet', { name: newProject });
      setProjects([...projects, res.data]);
      setNewProject('');
    } catch (err) {
      console.error(err);
    }
  };

  const updateProject = async (id, name) => {
    try {
      const res = await axios.put(`http://localhost:3005/projets/updateProjet/${id}`, { name });
      const updatedProjects = projects.map((project) =>
        project._id === id ? res.data : project
      );
      setProjects(updatedProjects);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/projets/deleteProjet/${id}`);
      const filteredProjects = projects.filter((project) => project._id !== id);
      setProjects(filteredProjects);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='project-container'>
      <div className='sidebar'>
        <h2>Menu</h2>
        <ul>
          <li>Projects</li>
         
        </ul>
      </div>
      <div className='main'>
        <h1>Projects</h1>
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <input
                type='text'
                value={project.name}
                onChange={(e) => updateProject(project._id, e.target.value)}
              />
              <button onClick={() => deleteProject(project._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type='text'
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button onClick={addProject}>Add Project</button>
      </div>
    </div>
  );
};

export default Project;