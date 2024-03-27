import { markerCategories } from '@/app/components/Map/mock/categories';
import React, { useRef } from 'react';
import { useAppDispatch } from '@/app/hooks/redux';
import {
  getModalCategoryName,
  openModalWindow,
} from '@/app/store/reducers/markerModalReducer';

const DefaultMaker = () => {
  const selectedCategory = useRef<string | null>(null);
  const dispatch = useAppDispatch();
  const handleCategoryClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string
  ) => {
    selectedCategory.current = category;
    const activeCategory = document.querySelector(
      `[data-category="${category}"]`
    );
    dispatch(getModalCategoryName(category.toUpperCase()));
    if (activeCategory) {
      activeCategory.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className='w-52 h-52 flex flex-col pl-1 overflow-hidden'>
      <h3 className='w-full text-sky-600 font-black size-3'>Add marker: </h3>
      <h4 className='text-sky-600 mt-6'>chose category from list</h4>
      <div className='pt-5 flex overflow-x-auto'>
        {markerCategories.map((category, index) => (
          <button
            onClick={(e) => handleCategoryClick(e, category.value)}
            data-category={category.value}
            key={index}
            className={category.cn}
          >
            {category.name}
          </button>
        ))}
      </div>
      <button
        onClick={() => dispatch(openModalWindow(true))}
        className='mt-8 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 '
      >
        Create Marker
      </button>
    </div>
  );
};

export default DefaultMaker;
