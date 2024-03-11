import { configureStore } from '@reduxjs/toolkit';
import geolocationReducer from '@/app/store/reducers/geolocationReducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      geolocation: geolocationReducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
