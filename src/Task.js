import Checkbox from "./Checkbox";
import { useState } from "react";
import axios from "axios";

export default function Task({ id, task, onToggle, onDelete, onEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:7777/todos/${id}`, { name: newName });
      onEdit(id, newName); // Update the local state after successful edit
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error('Error editing task:', error);
      // Handle the error (e.g., show a message to the user)
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
        <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
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
