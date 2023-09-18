import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function Task() {
  const [notes, setNotes] = useState([]);
  const [noteValue, setNoteValue] = useState("");
  const [emptyInput, setEmptyInput] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [updateError, setUpdateError] = useState("");
  const [checkedNotes, setCheckedNotes] = useState([]);

  const addNote = () => {
    const trimmedNoteValue = noteValue.trim();
    if (trimmedNoteValue) {
      setNotes([...notes, trimmedNoteValue]);
      setNoteValue("");
      setEmptyInput("");
      setCheckedNotes([...checkedNotes, false]); // Initialize checkbox state for the new note
    } else {
      setEmptyInput("inputan tidak boleh kosong");
    }
  };

  const updateNote = () => {
    if (selectedIndex !== -1) {
      const trimmedUpdateValue = updateValue.trim();
      if (trimmedUpdateValue) {
        const updatedNotes = [...notes];
        updatedNotes[selectedIndex] = trimmedUpdateValue;
        setNotes(updatedNotes);
        setUpdateValue("");
        setSelectedIndex(-1);
        setUpdateError("");
      } else {
        setUpdateError("Update input tidak boleh kosong");
      }
    }
  };

  const deleteNote = (index) => {
    if (index !== -1) {
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
      setUpdateValue("");
      setSelectedIndex(-1);
      setUpdateError("");
      const updatedCheckedNotes = [...checkedNotes];
      updatedCheckedNotes.splice(index, 1);
      setCheckedNotes(updatedCheckedNotes);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedNotes = [...checkedNotes];
    updatedCheckedNotes[index] = !checkedNotes[index];
    setCheckedNotes(updatedCheckedNotes);
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
            <p className="text-white mt-3">{emptyInput}</p>
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
            <p className="text-danger mt-3">{updateError}</p>
          </form>

          <div className="my-3" id="output">
            {notes.length === 0 ? (
              <p className="text-white">Notes masih kosong.</p>
            ) : (
              notes.map((note, index) => (
                <div
                  key={index}
                  className="item my-3 rounded-3 bg-dark-subtle"
                  style={{ padding: "10px" }}
                >
                  <pre
                    style={{
                      textDecoration: checkedNotes[index]
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {note}
                  </pre>
                  <div className="d-flex align-items-center justify-content-end">
                    <label className="d-flex">
                      Done?
                      <Form.Check
                        className="mx-2"
                        type="checkbox"
                        checked={checkedNotes[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className="btn btn-warning mx-3"
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
