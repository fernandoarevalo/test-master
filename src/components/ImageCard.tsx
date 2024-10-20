import React from 'react';
import { Image } from '../types/image';
import { likeImage } from '../services/api';

interface Props {
  image: Image;
}

const ImageCard: React.FC<Props> = ({ image }) => {
  const handleLike = async () => {
    try {
      await likeImage(image.id);
      console.log('Imagen likeada:', image.id);
    } catch (error) {
      console.log('Error al dar like:', error);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <img
        src={image.main_attachment.small}
        alt={image.title}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h3 className='font-bold text-lg mb-2 truncate'>{image.title}</h3>
        <p className='text-gray-700 text-sm mb-4'>By: {image.author}</p>
        <button
          onClick={handleLike}
          className={`w-full px-4 py-2 rounded ${
            image.liked
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {image.liked ? 'Unlike' : 'Like'} ({image.likes_count})
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
