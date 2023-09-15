import React, { useState } from "react";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskText.trim() === "") {
      setError("Inputan tidak boleh kosong");
      return;
    }

    // Menghapus pesan kesalahan sebelumnya
    setError("");

    // Menambahkan tugas baru ke dalam array tugas
    setTasks([...tasks, taskText]);

    // Mengosongkan input field
    setTaskText("");
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <>
      <section>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Tugas:</label>
              <input
                type="text"
                name="tasks"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
            </div>
            <button type="submit">Kirim</button>
          </form>
          <h2>{error}</h2>
          {tasks.map((task, index) => (
            <div key={index}>
              <h3>{task}</h3>
              <button onClick={() => deleteTask(index)}>Hapus</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Task;
