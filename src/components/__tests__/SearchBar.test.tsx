import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(
      screen.getByPlaceholderText('Buscar imágenes...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  it('calls onSearch with input value when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Buscar imágenes...');
    const button = screen.getByRole('button', { name: 'Buscar' });

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});
