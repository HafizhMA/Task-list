import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function Task() {
  const [notes, setNotes] = useState([]); // State untuk menyimpan catatan.
  const [noteValue, setNoteValue] = useState(""); // State untuk menyimpan nilai input catatan.
  const [emptyInput, setEmptyInput] = useState(""); // State untuk pesan kesalahan input kosong.
  const [updateValue, setUpdateValue] = useState(""); // State untuk menyimpan nilai input pembaruan catatan.
  const [selectedIndex, setSelectedIndex] = useState(-1); // State untuk menyimpan indeks catatan yang sedang diperbarui.
  const [updateError, setUpdateError] = useState(""); // State untuk pesan kesalahan pembaruan catatan.
  const [checkedNotes, setCheckedNotes] = useState([]); // State untuk menyimpan status tanda centang catatan.

  useEffect(() => {
    // Menggunakan useEffect untuk mengambil data dari localStorage saat komponen dimuat.
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    const savedCheckedNotes = JSON.parse(localStorage.getItem("checkedNotes"));

    if (savedNotes) {
      setNotes(savedNotes);
    }

    if (savedCheckedNotes) {
      setCheckedNotes(savedCheckedNotes);
    }
  }, []);

  const addNote = () => {
    // Fungsi untuk menambahkan catatan baru.
    const trimmedNoteValue = noteValue.trim();
    if (trimmedNoteValue) {
      setNotes([...notes, trimmedNoteValue]);
      setNoteValue("");
      setEmptyInput("");
      setCheckedNotes([...checkedNotes, false]);
      updateLocalStorage([...notes, trimmedNoteValue], checkedNotes);
    } else {
      setEmptyInput("Inputan tidak boleh kosong");
    }
  };

  const updateNote = () => {
    // Fungsi untuk memperbarui catatan yang ada.
    if (selectedIndex !== -1) {
      const trimmedUpdateValue = updateValue.trim();
      if (trimmedUpdateValue) {
        const updatedNotes = [...notes];
        updatedNotes[selectedIndex] = trimmedUpdateValue;
        setNotes(updatedNotes);
        setUpdateValue("");
        setSelectedIndex(-1);
        setUpdateError("");
        updateLocalStorage(updatedNotes, checkedNotes);
      } else {
        setUpdateError("Update input tidak boleh kosong");
      }
    }
  };

  const deleteNote = (index) => {
    // Fungsi untuk menghapus catatan.
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
      updateLocalStorage(updatedNotes, updatedCheckedNotes);
    }
  };

  const handleCheckboxChange = (index) => {
    // Fungsi untuk mengubah status tanda centang catatan.
    const updatedCheckedNotes = [...checkedNotes];
    updatedCheckedNotes[index] = !checkedNotes[index];
    setCheckedNotes(updatedCheckedNotes);
    updateLocalStorage(notes, updatedCheckedNotes);
  };

  // Helper function untuk memperbarui localStorage.
  const updateLocalStorage = (updatedNotes, updatedCheckedNotes) => {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    localStorage.setItem("checkedNotes", JSON.stringify(updatedCheckedNotes));
  };

  // Render tampilan komponen.
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
