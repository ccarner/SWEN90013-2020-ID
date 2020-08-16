import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterPage from "./registerPage";
import { NavLink } from "react-router-dom";

// Unit test for Register Text in RegisterPage
test("renders Register field", () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test for Username Text in RegisterPage
test("renders Username field", () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/Username:/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test for Password Text in RegisterPage
test("renders Password field", () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/Password:/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test for Last Name Text in RegisterPage
test("renders Last Name field", () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/Last Name:/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test for Email Address Text in RegisterPage
test("renders Email Address field", () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/Email Address:/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test for Phone Number Text in RegisterPage
test("renders Phone Number field", () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/Phone Number:/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test for Post Code Text in RegisterPage
test("renders Post Code field", () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/Post Code:/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test for Post Code Text in RegisterPage
test("renders Post Code field", () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/Post Code:/i);
  expect(linkElement).toBeInTheDocument();
});

//Test example
test("renders learn react link", () => {
  expect(1 + 1).toEqual(2);
});
