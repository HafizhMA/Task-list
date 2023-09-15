import React, { useState } from "react";

function Task() {
  const [notes, setNotes] = useState([]);
  const [noteValue, setNoteValue] = useState("");
  const [emptyInput, setEmptyInput] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const addNote = () => {
    const trimmedNoteValue = noteValue.trim();
    if (trimmedNoteValue) {
      setNotes([...notes, trimmedNoteValue]);
      setNoteValue("");
    } else if (noteValue === "") {
      setEmptyInput("inputan tidak boleh kosong");
      return;
    }
    setEmptyInput("");
  };

  const updateNote = () => {
    if (selectedIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[selectedIndex] = updateValue;
      setNotes(updatedNotes);
      setUpdateValue("");
      setSelectedIndex(-1);
    }
  };

  const deleteNote = (index) => {
    if (index !== -1) {
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
      setUpdateValue("");
      setSelectedIndex(-1);
    }
  };

  return (
    <div>
      <section style={{ padding: "100px 0" }}>
        <div
          className="container bg-dark rounded-3"
          style={{ padding: "20px" }}
        >
          <div className="text-center">
            <h1 className="text-white">Simple Note</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group my-3">
              <span className="input-group-text">Note</span>
              <textarea
                className="form-control"
                aria-label="Note"
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={addNote}>
              Submit
            </button>
          </form>

          <form style={{ display: selectedIndex !== -1 ? "block" : "none" }}>
            <div className="input-group my-3">
              <span className="input-group-text">Update Note</span>
              <textarea
                className="form-control"
                aria-label="Update Note"
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateNote}
            >
              Update
            </button>
          </form>

          <div className="my-3" id="output">
            <p className="text-white">{emptyInput}</p>
            {notes.length === 0 ? (
              <p className="text-white">Notes masih kosong.</p>
            ) : (
              notes.map((note, index) => (
                <div
                  key={index}
                  className="item my-3 rounded-3 bg-dark-subtle"
                  style={{ padding: "10px" }}
                >
                  <pre>{note}</pre>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="btn btn-warning"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteNote(index)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Task;
