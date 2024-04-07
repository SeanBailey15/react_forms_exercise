import React from "react";
import { render } from "@testing-library/react";
import Todo from "./Todo";

it("renders without crashing", () => {
  render(<Todo content={"Wash the car"} />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Todo content={"Wash the car"} />);
  expect(asFragment()).toMatchSnapshot();
});
