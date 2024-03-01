import { useState } from 'react';

export const Modal = ({ addNewTodo, closeModal }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    addNewTodo(input);
    closeModal();
    setInput('');
  };

  return (
    <div className="todoModal d-flex flex-column">
      <p className="mb-1">Add To Do</p>
      <textarea
        placeholder="Enter new to do"
        value={input}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
