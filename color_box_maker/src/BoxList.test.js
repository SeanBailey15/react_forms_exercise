import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", () => {
  act(() => {
    render(<BoxList />);
  });
});

it("matches snapshot", () => {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("should add a new box", async () => {
  act(() => {
    render(<BoxList />);
  });
  const width = screen.getByLabelText("Box Width");
  const height = screen.getByLabelText("Box Height");
  const color = screen.getByLabelText("Box Color");
  const addButton = screen.queryByText("Add Box");

  //check if button to remove a box is present
  expect(screen.queryByText("X")).not.toBeInTheDocument();

  //input box dimensions and color, then click to submit
  fireEvent.change(width, { target: { value: 100 } });
  fireEvent.change(height, { target: { value: 100 } });
  fireEvent.change(color, { target: { value: "blue" } });
  fireEvent.click(addButton);

  //check that button to remove a box is now present
  const closeButton = await screen.findByText("X");
  expect(closeButton).toBeInTheDocument();

  const box = screen.getByTestId("box");
  expect(box).toBeInTheDocument();
  expect(box).toHaveStyle(
    "width: 100px; height: 100px; background-color: blue;"
  );
});

it("should remove a box", async () => {
  act(() => {
    render(<BoxList />);
  });
  const width = screen.getByLabelText("Box Width");
  const height = screen.getByLabelText("Box Height");
  const color = screen.getByLabelText("Box Color");
  const addButton = screen.queryByText("Add Box");

  expect(screen.queryByText("X")).not.toBeInTheDocument();

  fireEvent.change(width, { target: { value: 100 } });
  fireEvent.change(height, { target: { value: 100 } });
  fireEvent.change(color, { target: { value: "blue" } });
  fireEvent.click(addButton);

  const removeButton = await screen.findByText("X");
  expect(removeButton).toBeInTheDocument();

  const box = screen.getByTestId("box");
  expect(box).toBeInTheDocument();
  expect(box).toHaveStyle(
    "width: 100px; height: 100px; background-color: blue;"
  );

  fireEvent.click(removeButton);

  expect(box).not.toBeInTheDocument();
  expect(removeButton).not.toBeInTheDocument();
});
