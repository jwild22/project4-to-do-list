import { useState } from 'react';
import { MOVE_BACK, OPTION_SVG, TRASHBIN_SVG } from '../../../images';

export const ToDo = ({
  todo,
  toggleComplete,
  toggleDelete,
  toggleDeleteForever,
  select,
  selected,
}) => {
  const [isToggled, setToggle] = useState(false);

  const handleOption = () => {
    select(todo.id);
    setToggle((prevstate) => !prevstate);
  };

  const handleComplete = () => {
    setToggle((prevstate) => !prevstate);
    toggleComplete(todo.id);
  };

  const handleDelete = () => {
    setToggle((prevstate) => !prevstate);
    toggleDelete(todo.id);
  };

  const handleDeleteForever = () => {
    setToggle((prevstate) => !prevstate);
    toggleDeleteForever(todo.id);
  };

  return (
    <div
      style={{ position: 'relative' }}
      className="d-flex align-items-center mb-2"
    >
      <div
        style={{ cursor: 'pointer' }}
        className="d-flex me-2 align-items-center"
        onClick={handleOption}
      >
        {OPTION_SVG}
      </div>
      <input
        className="me-2"
        type="checkbox"
        onChange={handleComplete}
        checked={todo.completed}
      />
      <div className={`${todo.completed ? 'completed_item' : 'todo_item'}`}>
        {todo.name}
      </div>
      {todo.id === selected && isToggled && !todo.deleted && (
        <button onClick={handleDelete} className="move_to_trash">
          {TRASHBIN_SVG} Move to Trash
        </button>
      )}
      {todo.id === selected && isToggled && todo.deleted && (
        <>
          <button
            onClick={handleDeleteForever}
            className="move_to_trash delete_forever"
          >
            {TRASHBIN_SVG} Delete Forever
          </button>
          <button onClick={handleDelete} className="move_to_trash">
            {MOVE_BACK} Move Back To To Do
          </button>
        </>
      )}
    </div>
  );
};
