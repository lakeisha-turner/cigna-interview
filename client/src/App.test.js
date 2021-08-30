import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders Medical Doctors header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Medical Doctors/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders doctors filter input field',() =>{
  render(<App />);
  const elem = screen.getByPlaceholderText('Filter Doctors');
  expect(elem).toBeInTheDocument();

});