import { createSlice } from '@reduxjs/toolkit';
interface IComment {
  author: string;
  rating: number;
  comment: string;
}

export interface IMarkerModal {
  category: string;
  title: string;
  description: string;
  coords: { lat: number; lng: number };
}

interface InitialState {
  isModalOpen: boolean;
  newPlaceMarkerData: IMarkerModal | null;
  category: undefined | string;
}

const initialState: InitialState = {
  isModalOpen: false,
  newPlaceMarkerData: null,
  category: undefined,
};

const markerModalSLice = createSlice({
  name: 'markerModalSlice',
  initialState,
  reducers: {
    getNewMarkerModalData: (
      state,
      action: { payload: IMarkerModal; type: string }
    ) => {
      state.newPlaceMarkerData = action.payload;
    },
    openModalWindow: (state, action: { payload: boolean; type: string }) => {
      state.isModalOpen = action.payload;
    },
    getModalCategoryName: (
      state,
      action: { payload: string; type: string }
    ) => {
      state.category = action.payload;
    },
  },
});

export const { getNewMarkerModalData, openModalWindow, getModalCategoryName } =
  markerModalSLice.actions;
export default markerModalSLice.reducer;
