import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageCard from '../ImageCard';
import { Image } from '../../types/image';
import { likeImage } from '../../services/api';

// Mock del servicio api
jest.mock('../../services/api', () => ({
  likeImage: jest.fn(),
}));

const mockImage: Image = {
  id: 1,
  title: 'Test Image',
  author: 'Test Author',
  main_attachment: {
    small: 'test-image-url.jpg',
    big: 'test-image-url-big.jpg',
  },
  likes_count: 10,
  liked: false,
  created_at: '2023-05-01',
  type: 'image',
  links: [],
};

describe('ImageCard', () => {
  it('renders correctly', () => {
    render(<ImageCard image={mockImage} />);

    expect(screen.getByText('Test Image')).toBeInTheDocument();
    expect(screen.getByText('By: Test Author')).toBeInTheDocument();
    expect(screen.getByText('Like (10)')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image')).toHaveAttribute(
      'src',
      'test-image-url.jpg'
    );
  });

  it('calls likeImage when like button is clicked', async () => {
    render(<ImageCard image={mockImage} />);

    const likeButton = screen.getByText('Like (10)');
    fireEvent.click(likeButton);

    expect(likeImage).toHaveBeenCalledWith(1);
  });
});
