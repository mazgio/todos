import Checkbox from "./Checkbox";
import { useState, useEffect, useRef } from "react";

export default function Task({ id, task, onToggle, onDelete, onEdit, onUpdate }) {

  const inputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(task.name);

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);


  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await onEdit(id, newName);
      setEditMode(false);
      onUpdate(id, { name: newName }); // Trigger immediate fetch after successful update
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  return (
    <div className={`task ${task.done ? 'done' : ''}`}>
      <Checkbox checked={task.done} onClick={() => onToggle(task.id, !task.done)} />

      {!editMode && (
        <div className="task-name" onClick={() => setEditMode(true)}>
          <span>{task.name}</span>
        </div>
      )}

      {editMode && (
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={newName} onChange={handleInputChange} ref={inputRef} />
        </form>
      )}

      <button className="trash" onClick={() => onDelete(task.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </button>
    </div>
  );
}
