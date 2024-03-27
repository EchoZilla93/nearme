import { configureStore } from '@reduxjs/toolkit';
import geolocationReducer from '@/app/store/reducers/geolocationReducer';
import markerModalReducer from '@/app/store/reducers/markerModalReducer';
import mapReducer from '@/app/store/reducers/mapReducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      geolocation: geolocationReducer,
      markerModal: markerModalReducer,
      map: mapReducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
