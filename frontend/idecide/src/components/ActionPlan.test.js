import React from 'react';
import { render } from '@testing-library/react';
import ActionPlan from './ActionPlan';

test('renders recommendation 1', () => {
  const { getByText } = render(<ActionPlan />);
  const textElement = getByText(/recommendation 1/i);
  expect(textElement).toBeInTheDocument();
});

test('renders recommendation 2', () => {
  const { getByText } = render(<ActionPlan />);
  const textElement = getByText(/recommendation 1/i);
  expect(textElement).toBeInTheDocument();
});

test('renders recommendation 3', () => {
  const { getByText } = render(<ActionPlan />);
  const textElement = getByText(/recommendation 1/i);
  expect(textElement).toBeInTheDocument();
});

test('renders recommendation 4', () => {
  const { getByText } = render(<ActionPlan />);
  const textElement = getByText(/recommendation 1/i);
  expect(textElement).toBeInTheDocument();
});

test('renders recommendation 5', () => {
  const { getByText } = render(<ActionPlan />);
  const textElement = getByText(/recommendation 1/i);
  expect(textElement).toBeInTheDocument();
});
test('renders button 1', () => {
  const { getByText } = render(<ActionPlan />);
  const buttonElement = getByText(/View1/i);
  expect(buttonElement).toBeInTheDocument();
});
test('renders button 2', () => {
  const { getByText } = render(<ActionPlan />);
  const buttonElement = getByText(/View2/i);
  expect(buttonElement).toBeInTheDocument();
});
test('renders button 3', () => {
  const { getByText } = render(<ActionPlan />);
  const buttonElement = getByText(/View3/i);
  expect(buttonElement).toBeInTheDocument();
});
test('renders button 4', () => {
  const { getByText } = render(<ActionPlan />);
  const buttonElement = getByText(/View4/i);
  expect(buttonElement).toBeInTheDocument();
});
test('renders button 5', () => {
  const { getByText } = render(<ActionPlan />);
  const buttonElement = getByText(/View5/i);
  expect(buttonElement).toBeInTheDocument();
});


//Test example
test('renders learn react link', () => {
  expect(1+1).toEqual(2);
});
