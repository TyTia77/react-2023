import React from "react";
import { render, screen } from "@testing-library/react";
import Page6 from "./page6";

test("renders learn react link", () => {
  render(<Page6 />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
