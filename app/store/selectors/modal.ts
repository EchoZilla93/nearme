import { RootState } from '@/app/store';

export const getModalCategory = (state: RootState) =>
  state.markerModal.category;

export const getNewPinData = (state: RootState) => state.markerModal.newPlaceMarkerData;
