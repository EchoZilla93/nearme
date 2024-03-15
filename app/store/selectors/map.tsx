import { RootState } from '@/app/store';

export const getCenterFromStore = (state: RootState) =>
  state.geolocation.center;

export const getModalWindowOpenStatus = (state: RootState) =>
  state.markerModal.isModalOpen;
