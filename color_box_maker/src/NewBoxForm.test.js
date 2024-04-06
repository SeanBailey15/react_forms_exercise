import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

it("renders without crashing", () => {
  act(() => {
    render(<NewBoxForm />);
  });
});

it("matches snapshot", () => {
  const { asFragment } = render(<NewBoxForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("tests for non-number width", async () => {
  act(() => {
    render(<NewBoxForm />);
  });

  const width = screen.getByLabelText("Box Width");
  const addButton = screen.getByText("Add Box");

  // Initially, the error message should not be present
  expect(
    screen.queryByText("Width Must Be A Positive Number")
  ).not.toBeInTheDocument();

  // Change the width to an invalid value
  fireEvent.change(width, { target: { value: "one" } });
  fireEvent.click(addButton);

  // Wait for the error message to appear and check if it is present
  const errorMessage = await screen.findByText(
    "Width Must Be A Positive Number"
  );
  expect(errorMessage).toBeInTheDocument();
});

//************************************************************** */
// Repeat above steps for other expected validation errors

it("tests for width greater than 500", async () => {
  act(() => {
    render(<NewBoxForm />);
  });

  const width = screen.getByLabelText("Box Width");
  const addButton = screen.getByText("Add Box");

  expect(
    screen.queryByText("Value Must Be 500 Or Less")
  ).not.toBeInTheDocument();

  fireEvent.change(width, { target: { value: 600 } });
  fireEvent.click(addButton);

  const errorMessage = await screen.findByText("Value Must Be 500 Or Less");
  expect(errorMessage).toBeInTheDocument();
});

it("tests for non-number height", async () => {
  act(() => {
    render(<NewBoxForm />);
  });

  const height = screen.getByLabelText("Box Height");
  const addButton = screen.getByText("Add Box");

  expect(
    screen.queryByText("Height Must Be A Positive Number")
  ).not.toBeInTheDocument();

  fireEvent.change(height, { target: { value: "one" } });
  fireEvent.click(addButton);

  const errorMessage = await screen.findByText(
    "Height Must Be A Positive Number"
  );
  expect(errorMessage).toBeInTheDocument();
});

it("tests for height greater than 500", async () => {
  act(() => {
    render(<NewBoxForm />);
  });

  const height = screen.getByLabelText("Box Height");
  const addButton = screen.getByText("Add Box");

  expect(
    screen.queryByText("Value Must Be 500 Or Less")
  ).not.toBeInTheDocument();

  fireEvent.change(height, { target: { value: 600 } });
  fireEvent.click(addButton);

  const errorMessage = await screen.findByText("Value Must Be 500 Or Less");
  expect(errorMessage).toBeInTheDocument();
});

it("tests for invalid color", async () => {
  act(() => {
    render(<NewBoxForm />);
  });

  const color = screen.getByLabelText("Box Color");
  const addButton = screen.getByText("Add Box");

  expect(screen.queryByText("Invalid Color Name")).not.toBeInTheDocument();

  fireEvent.change(color, { target: { value: "bleh" } });
  fireEvent.click(addButton);

  const errorMessage = await screen.findByText("Invalid Color Name");
  expect(errorMessage).toBeInTheDocument();
});

it("tests for required input error", async () => {
  act(() => {
    render(<NewBoxForm />);
  });

  const addButton = screen.getByText("Add Box");

  expect(screen.queryByText("Required")).not.toBeInTheDocument();

  fireEvent.click(addButton);

  const errorMessage = await screen.findAllByText("Required");
  expect(errorMessage).toHaveLength(3);
});
