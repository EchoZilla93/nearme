import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useAppDispatch } from '@/app/hooks/redux';
import { setCenter } from '@/app/store/reducers/geolocationReducer';
const SearchField = () => {
  const dispatch = useAppDispatch();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { types: ['locality'] },
    debounce: 600,
  });

  const handleSelection = async (address: any) => {
    setValue(address.target?.value, false);
    clearSuggestions();
    try {
      const result = await getGeocode({ address: address.target?.value });
      const { lat, lng } = getLatLng(result[0]);
      dispatch(setCenter({ lat, lng }));
    } catch (error) {
      throw new Error('Error in fetching location');
    }
  };

  return (
    <>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
      >
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type={'search'}
          id={'search'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder={'Search City'}
          required
        />
        {status === 'OK' && data.length && (
          <select
            multiple
            onChange={handleSelection}
            id='countries_multiple'
            className='absolute top-35 mt-2.5 z-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            {data.map(({ place_id, description }) => (
              <option key={place_id} value={description}>
                {description}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default SearchField;
