import { createSlice } from '@reduxjs/toolkit';
import { IMarkerModal } from '@/app/store/reducers/markerModalReducer';

interface IMapReducerState {
  pins: Array<IMarkerModal>;
}

const initialState: IMapReducerState = {
  pins: [],
};

const mapReducer = createSlice({
  name: 'getPinsData',
  initialState,
  reducers: {
    storePinsData: (
      state,
      action: { payload: Array<IMarkerModal>; type: string }
    ) => {
      state.pins = action.payload;
    },
  },
});

export const { storePinsData } = mapReducer.actions;
export default mapReducer.reducer;
