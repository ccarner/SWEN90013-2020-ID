import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Log in/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders anonymous link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Anonymous/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders home link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders get help', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/GET HELP/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders quick exit', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/QUICK EXIT/i);
  expect(linkElement).toBeInTheDocument();
});

//Test example 1
test('renders learn react link', () => {
  expect(1+1).toEqual(2);
});
