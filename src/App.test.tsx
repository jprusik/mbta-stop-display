import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders the App', () => {
  render(<App />);
  const loadingState = screen.getByText(/Data is loading../i);
  expect(loadingState).toBeInTheDocument();
});
