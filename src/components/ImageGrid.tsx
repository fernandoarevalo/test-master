import React, { useState, useEffect, useCallback } from 'react';
import { Image } from '../types/image';
import { fetchImages } from '../services/api';
import ImageCard from './ImageCard';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

interface Props {
  searchQuery: string;
}

const ImageGrid: React.FC<Props> = ({ searchQuery }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const newImages = await fetchImages(page, searchQuery);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log('Error cargando imágenes:', error);
    }
    setLoading(false);
  }, [page, searchQuery]);

  useEffect(() => {
    setPage(1);
    setImages([]);
    loadImages();
  }, [searchQuery]);

  const [isFetching, setIsFetching] = useInfiniteScroll(loadMoreImages);

  function loadMoreImages() {
    loadImages();
    setIsFetching(false);
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
          />
        ))}
      </div>
      {(loading || isFetching) && (
        <p className='text-center mt-4'>Cargando...</p>
      )}
    </div>
  );
};

export default ImageGrid;
