import React from "react";
import { render, screen } from "@testing-library/react";
import { NavLink } from "react-router-dom";
import LoginPage from "./loginPage";

// Unit test for LoginText in LoginPage
test("renders Login field", () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test for Email Address in LoginPage
test("renders Email Address field", () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/Email Address/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test for Password in LoginPage
test("renders Password field", () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/Password:/i);
  expect(linkElement).toBeInTheDocument();
});

//Test example
test("renders learn react link", () => {
  expect(1 + 1).toEqual(2);
});
