import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Galería heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Galería/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders search input and button', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Buscar imágenes.../i);
  const buttonElement = screen.getByText(/Buscar/i);
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('renders loading text', () => {
  render(<App />);
  const loadingElement = screen.getByText(/Cargando.../i);
  expect(loadingElement).toBeInTheDocument();
});
