import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { MapMouseEvent } from '@vis.gl/react-google-maps';
import { setCenter } from '@/app/store/reducers/geolocationReducer';
import {
  getCenterFromStore,
  getModalWindowOpenStatus,
  getPinsData,
} from '@/app/store/selectors/map';
import { getNewPinData } from '@/app/store/selectors/modal';
import axios from 'axios';
import { storePinsData } from '@/app/store/reducers/mapReducer';

const useMap = () => {
  const [open, setOpen] = useState(false);
  const [activePinCoords, setActivePinCoords] = useState<{
    lat: number;
    lng: number;
  }>();
  const isOpenModalWindow = useAppSelector(getModalWindowOpenStatus);
  const basePosition = useAppSelector(getCenterFromStore);
  const addedMarker = useAppSelector(getNewPinData);
  const areaPinsArray = useAppSelector(getPinsData);
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

  useEffect(() => {
    axios
      .get('/api/getPinsData')
      .then((res) => dispatch(storePinsData(res.data.pins)));
  }, [addedMarker]);

  return {
    open,
    basePosition,
    handleMapCordClick,
    setOpen,
    isOpenModalWindow,
    areaPinsArray,
    setActivePinCoords,
    activePinCoords,
  };
};

export default useMap;
