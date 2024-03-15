import { CloseIcon } from '@/app/components/Map/Modals/icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import {
  getNewMarkerModalData,
  IMarkerModal,
  openModalWindow,
} from '@/app/store/reducers/markerModalReducer';
import { getModalCategory } from '@/app/store/selectors/modal';
import useMap from '@/app/components/Map/useMap';

const INPUT_FIELDS = [
  {
    name: 'category',
    placeholder: 'Category',
    disabled: true,
    type: 'input',
  },
  {
    name: 'title',
    placeholder: 'Title',
    disabled: false,
    type: 'input',
  },
  {
    name: 'description',
    placeholder: 'Description',
    disabled: false,
    type: 'textarea',
  },
  {
    address: 'address',
    placeholder: 'Address',
    disabled: false,
    type: 'input',
  },
];

const MarkerModal = () => {
  const dispatch = useAppDispatch();
  const placeCategory = useAppSelector(getModalCategory);
  const { basePosition, setOpen } = useMap();

  const handleCloseModal = () => dispatch(openModalWindow(false));

  const handleMarkerFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const dataToStore = {} as IMarkerModal;

    Array.from(target).forEach(
        //@ts-ignore
        (el) => (dataToStore[el.id] = el.value)
    );

    dataToStore!.coords = basePosition;
    dataToStore!.category = placeCategory?.toLowerCase() || '';

    dispatch(getNewMarkerModalData(dataToStore));
    //TODO: Handle close marker info window after submit
    setOpen(false);
    handleCloseModal();
  }
  return (
    <div
      id='default-modal'
      aria-hidden='true'
      className='z-50 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
    >
      <div className='relative p-4 w-full max-w-2xl max-h-full'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold  dark:text-white'>
              Describe your place
            </h3>
            <button
              onClick={handleCloseModal}
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='default-modal'
            >
              <CloseIcon />
            </button>
          </div>
          <div className='p-4 md:p-5 space-y-4'>
            <form
              onSubmit={handleMarkerFormSubmit}
            >
              {INPUT_FIELDS.map((field, index) => (
                <div key={index}>
                  {field.type === 'input' ? (
                    <input
                      type='text'
                      id={field.name}
                      disabled={field.disabled}
                      className='bg-gray-50 mb-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder={
                        field.name === 'category'
                          ? placeCategory
                          : field.placeholder
                      }
                      required
                    />
                  ) : (
                    <textarea
                      id='message'
                      rows='2'
                      className='block mb-2.5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder={field.placeholder}
                    ></textarea>
                  )}
                </div>
              ))}
              <button
                data-modal-hide='default-modal'
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Add Place
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerModal;
