import React from 'react';
import { render, screen} from '@testing-library/react';
import RegisterPage from './registerPage';
import { NavLink } from 'react-router-dom';



test('renders register link', () => {
  render(<RegisterPage />);
  const linkElement = screen.getByText(/Password:/i);
  expect(linkElement).toBeInTheDocument();
});
//Test example
test('renders learn react link', () => {
  expect(1+1).toEqual(2);
});
