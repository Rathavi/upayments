import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders register link', () => {
  render(<App />);
  const registerElement = screen.getByText(/Register/i);
  expect(registerElement).toBeInTheDocument();
});
