import { Image } from '../types/image';

const API_URL = 'http://localhost:3100';

export const fetchImages = async (
  page: number,
  search?: string
): Promise<Image[]> => {
  const response = await fetch(
    `${API_URL}/images?page=${page}${search ? `&search=${search}` : ''}`
  );
  if (!response.ok) {
    throw new Error('Error fetching images');
  }
  return response.json();
};

export const likeImage = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/images/${id}/likes`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Error liking image');
  }
};
