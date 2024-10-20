import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ImageGrid from '../ImageGrid';
import { fetchImages } from '../../services/api';

// Mock the API call
jest.mock('../../services/api');

// Mock the useInfiniteScroll hook
jest.mock('../../hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: jest.fn(() => [false, jest.fn()]),
}));

const mockUseInfiniteScroll = jest.requireMock(
  '../../hooks/useInfiniteScroll'
).useInfiniteScroll;

describe('ImageGrid', () => {
  beforeEach(() => {
    // Configurar el mock de fetchImages para devolver una promesa resuelta
    (fetchImages as jest.Mock).mockResolvedValue([
      {
        id: '1',
        main_attachment: { small: 'test-url-1' },
        title: 'Test Image 1',
      },
      {
        id: '2',
        main_attachment: { small: 'test-url-2' },
        title: 'Test Image 2',
      },
    ]);

    mockUseInfiniteScroll.mockReturnValue([false, jest.fn()]);
  });

  it('renders correctly and fetches images', async () => {
    render(<ImageGrid searchQuery='' />);

    // Esperar a que se muestre el mensaje de carga
    expect(screen.getByText('Cargando...')).toBeInTheDocument();

    // Esperar a que se muestren las imágenes
    await waitFor(() => {
      expect(screen.getByText('Test Image 1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Test Image 2')).toBeInTheDocument();
    });
  });

  it('updates when searchQuery changes', async () => {
    const { rerender } = render(<ImageGrid searchQuery='' />);

    await waitFor(() => {
      expect(screen.getByText('Test Image 1')).toBeInTheDocument();
    });

    // Cambiar la searchQuery y volver a renderizar
    (fetchImages as jest.Mock).mockResolvedValue([
      {
        id: '3',
        main_attachment: { small: 'test-url-3' },
        title: 'New Test Image',
      },
    ]);

    rerender(<ImageGrid searchQuery='new search' />);

    await waitFor(() => {
      expect(screen.getByText('New Test Image')).toBeInTheDocument();
    });
  });
});
