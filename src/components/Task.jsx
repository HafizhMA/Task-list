import React, { useState } from "react";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState(""); // State for input text

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new task to the tasks array
    setTasks([...tasks, taskText]);

    // Clear the input field
    setTaskText("");
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  console.log(tasks);

  return (
    <>
      <section>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Task:</label>
              <input
                type="text"
                name="tasks"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
            </div>
            <button type="submit">Kirim</button>
          </form>
          {tasks.map((task, index) => (
            <div key={index}>
              <h3>{task}</h3>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Task;
