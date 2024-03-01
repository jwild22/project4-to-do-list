import { useState } from 'react';
import { ToDo } from './ToDo';

export const ToDoList = ({
  todoList,
  toggleComplete,
  toggleDelete,
  toggleDeleteForever,
}) => {
  const [selected, setSelected] = useState(null);

  const select = (id) => {
    setSelected(id);
  };

  return todoList.map((item, index) => (
    <ToDo
      todo={item}
      key={index}
      toggleComplete={toggleComplete}
      toggleDelete={toggleDelete}
      toggleDeleteForever={toggleDeleteForever}
      select={select}
      selected={selected}
    />
  ));
};
