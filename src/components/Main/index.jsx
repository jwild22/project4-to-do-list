import React, { useState, useEffect, useMemo } from 'react';
import { Filter } from './Filter';
import { Modal } from './Modal';
import { ToDoList } from './ToDo';

export const Main = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos
      ? JSON.parse(storedTodos)
      : [{ name: 'Buy Groceries', id: 0, completed: false, deleted: false }];
  });
  const [status, setStatus] = useState(() => {
    const storedStatus = sessionStorage.getItem('status');
    return storedStatus || 'To Do';
  });
  const statuses = ['To Do', 'Done', 'Trash'];
  const [todoCounter, setTodoCounter] = useState(1);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const addNewTodo = (newTodo) => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        name: newTodo,
        id: todoCounter,
        completed: false,
        deleted: false,
      };
      setTodoList([...todoList, newTodoItem]);
      setTodoCounter(todoCounter + 1);
    }
  };

  const toggleComplete = (id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const toggleDelete = (id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, deleted: !todo.deleted };
        }
        return todo;
      })
    );
  };

  const toggleDeleteForever = (id) => {
    setTodoList(
      todoList.filter((todo) => {
        if (todo.id !== id) {
          return todo;
        }
      })
    );
  };

  const applyFilter = (selectedStatus) => {
    setStatus(selectedStatus);
    sessionStorage.setItem('status', selectedStatus);
  };

  const filteredTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (status === 'To Do') return !todo.deleted;
      if (status === 'Done') return todo.completed && !todo.deleted;
      if (status === 'Trash') return todo.deleted;
      return false;
    });
  }, [todoList, status]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div>
      <div className="d-flex mb-5 justify-content-between align-items-center">
        <div>
          {statuses.map((s, index) => (
            <Filter key={index} buttonName={s} applyFilter={applyFilter} />
          ))}
        </div>
        <div>
          <button className="plus" onClick={openModal}>
            +
          </button>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        {isModalOpen && (
          <Modal addNewTodo={addNewTodo} closeModal={closeModal} />
        )}
        <p className="to_do">{status}</p>
        <hr />
      </div>
      <div>
        <ToDoList
          todoList={filteredTodos}
          toggleComplete={toggleComplete}
          toggleDelete={toggleDelete}
          toggleDeleteForever={toggleDeleteForever}
        />
      </div>
    </div>
  );
};
