import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import TodoList from "./TodoList";

it("renders without crashing", () => {
  act(() => {
    render(<TodoList />);
  });
});

it("matches snapshot", () => {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("should add a new todo", async () => {
  act(() => {
    render(<TodoList />);
  });
  const content = screen.getByLabelText("Todo");
  const addButton = screen.queryByText("Add A Task");

  //check if button to remove a todo is present
  expect(screen.queryByText("X")).not.toBeInTheDocument();

  //input todo content, then click to submit
  fireEvent.change(content, { target: { value: "Wash the car" } });
  fireEvent.click(addButton);

  //check that button to remove a todo is now present
  const closeButton = await screen.findByText("X");
  expect(closeButton).toBeInTheDocument();

  //check that todo is present and content is as expected
  const todo = screen.getByTestId("todo");
  expect(todo).toBeInTheDocument();
  expect(todo.textContent).toEqual("Wash the car");
});

it("should remove a todo", async () => {
  act(() => {
    render(<TodoList />);
  });
  const content = screen.getByLabelText("Todo");
  const addButton = screen.queryByText("Add A Task");

  expect(screen.queryByText("X")).not.toBeInTheDocument();

  fireEvent.change(content, { target: { value: "Wash the car" } });
  fireEvent.click(addButton);

  const removeButton = await screen.findByText("X");
  expect(removeButton).toBeInTheDocument();

  const todo = screen.getByTestId("todo");
  expect(todo).toBeInTheDocument();
  expect(todo.textContent).toEqual("Wash the car");

  fireEvent.click(removeButton);

  expect(todo).not.toBeInTheDocument();
  expect(removeButton).not.toBeInTheDocument();
});
