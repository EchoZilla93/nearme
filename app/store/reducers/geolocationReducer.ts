import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BASE_POSITION } from '@/app/components/Map/mock/cordinates';

interface IGeolocationSlice {
  center: { lat: number; lng: number };
}

const initialState: IGeolocationSlice = {
  center: BASE_POSITION,
};

export const geolocationSlice = createSlice({
  name: 'geolocationSlice',
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.center = action.payload;
    },
  },
});

export const { setCenter } = geolocationSlice.actions;
export default geolocationSlice.reducer;
