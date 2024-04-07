import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("renders without crashing", () => {
  act(() => {
    render(<NewTodoForm />);
  });
});

it("matches snapshot", () => {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("tests for empty input", async () => {
  act(() => {
    render(<NewTodoForm />);
  });

  const content = screen.getByLabelText("Todo");
  const addButton = screen.getByText("Add A Task");

  // Initially, the error message should not be present
  expect(screen.queryByText("Required")).not.toBeInTheDocument();

  // Try to submit an empty input
  fireEvent.click(addButton);

  // Wait for the error message to appear and check if it is present
  const errorMessage = await screen.findByText("Required");
  expect(errorMessage).toBeInTheDocument();
});

//************************************************************** */
// Repeat above steps for other expected validation errors

it("tests for input greater than 30 characters", async () => {
  act(() => {
    render(<NewTodoForm />);
  });

  const content = screen.getByLabelText("Todo");
  const addButton = screen.getByText("Add A Task");

  expect(
    screen.queryByText("Todo Must Be 30 Characters Or Less")
  ).not.toBeInTheDocument();

  fireEvent.change(content, {
    target: { value: "I am a very long todo that will not pass validation" },
  });
  fireEvent.click(addButton);

  const errorMessage = await screen.findByText(
    "Todo Must Be 30 Characters Or Less"
  );
  expect(errorMessage).toBeInTheDocument();
});
