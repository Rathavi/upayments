import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders logo text', () => {
  render(<App />);
  const logoElement = screen.getByText(/UPayments Store/i);
  expect(logoElement).toBeInTheDocument();
});
