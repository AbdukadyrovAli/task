import React, { useState, useEffect } from "react";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import styled from "styled-components";

const Form = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/v1")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const textChangeHandler = (event) => {
    setInputText(event.target.value);
  };

  const enabled = inputText;

  const addNewTodo = (todo) => {
    fetch("/api/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => setTodos((prevTodos) => [...prevTodos, data]));
  };

  const deleteTodoHandler = (id) => {
    fetch(`/api/v1/${id}`, { method: "DELETE" }).then(() =>
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    );
  };

  const toggleCompletedHandler = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    fetch(`/api/v1/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) =>
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? data : todo))
        )
      );
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const todo = {
      id: Date.now().toString(),
      title: inputText,
      completed: false,
    };

    addNewTodo(todo);

    setInputText("");
  };

  return (
    <FormStyled onSubmit={submitHandler}>
      <InputContainer className="inputContainer">
        <Input
          type="text"
          label="Task"
          id="1"
          onChange={textChangeHandler}
          value={inputText}
        />
      </InputContainer>

      <Container>
        <ButtonContainer>
          <Button disabled={!enabled}>Add</Button>
        </ButtonContainer>
      </Container>

      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <Checkbox
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletedHandler(todo.id)}
            />
            <span>{todo.title}</span>
            <Button onClick={() => deleteTodoHandler(todo.id)}>Delete</Button>
          </TodoItem>
        ))}
      </TodoList>
    </FormStyled>
  );
};

export default Form;

const FormStyled = styled.form`
  width: 40%;
  height: 150px;
  background: #ad9be9;
  border-radius: 12px;
  padding: 30px 40px;
  margin-left: 450px;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const TodoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;
const TodoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 50px;
  flex-direction: row;
  gap: 10px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;
