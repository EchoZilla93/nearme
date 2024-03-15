import { RootState } from '@/app/store';

export const getModalCategory = (state: RootState) =>
  state.markerModal.category;
