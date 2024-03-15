import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { MapMouseEvent } from '@vis.gl/react-google-maps';
import { setCenter } from '@/app/store/reducers/geolocationReducer';
import {
  getCenterFromStore,
  getModalWindowOpenStatus,
} from '@/app/store/selectors/map';

const useMap = () => {
  const [open, setOpen] = useState(false);
  const isOpenModalWindow = useAppSelector(getModalWindowOpenStatus);
  const basePosition = useAppSelector(getCenterFromStore);
  const dispatch = useAppDispatch();

  const handleMapCordClick = (event: MapMouseEvent) =>
    dispatch(setCenter(event.detail.latLng as { lat: number; lng: number }));

  const changeMapCenterVisually = useCallback(() => {
    if (!basePosition) return;
    setOpen(true);
  }, [basePosition]);

  // Centering map on location change
  useEffect(() => {
    changeMapCenterVisually();
  }, [basePosition, changeMapCenterVisually]);

  return { open, basePosition, handleMapCordClick, setOpen, isOpenModalWindow };
};

export default useMap;
