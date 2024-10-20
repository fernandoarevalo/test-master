import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow-md'>
        <div className='container mx-auto px-4 py-4 sm:py-6'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left'>
            Galería
          </h1>
        </div>
      </header>
      <main className='container mx-auto px-4 py-6 sm:py-8'>
        <SearchBar onSearch={handleSearch} />
        <ImageGrid searchQuery={searchQuery} />
      </main>
    </div>
  );
};

export default App;
