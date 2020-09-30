import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from './Landing';

test('renders wellbeing tool', () => {
  render(<Landing />);
  const linkElement = screen.getByText(/Women's Wellbeing Tool/i);
  expect(linkElement).toBeInTheDocument();
});
