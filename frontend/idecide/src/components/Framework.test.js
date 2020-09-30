import React from 'react';
import { render, screen } from '@testing-library/react';
import Framework from './Framework';

test('renders Greetings', () => {
  render(<Framework/>);
  const linkElement = screen.getByText(/Hello from Framework./i);
  expect(linkElement).toBeInTheDocument();
});
