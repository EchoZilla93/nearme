'use client';

import {
  APIProvider,
  Map,
  Marker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { mapLayout } from '@/app/components/Map/assets/mapStyle';
import useMap from '@/app/components/Map/useMap';
import { DefaultMaker } from '@/app/components/Map/Markers';
import MarkerModal from '@/app/components/Map/Modals/MarkerModal';
import { IMarkerModal } from '@/app/store/reducers/markerModalReducer';
import {pinColors} from "@/app/components/Map/mock/pinColors";

const GoogleMapContainer = () => {
  const {
    basePosition,
    handleMapCordClick,
    setOpen,
    open,
    isOpenModalWindow,
    areaPinsArray,
    setActivePinCoords,
    activePinCoords,
  } = useMap();

  const mapPinClickHandler = (pin: IMarkerModal) => {
    setOpen(true);
    setActivePinCoords(pin.coords);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC__GOOGLEMAPS_API_KEY!}>
      <div className={'w-screen h-screen'}>
        <Map
          styles={mapLayout}
          controlled={false}
          disableDefaultUI
          defaultZoom={13}
          defaultCenter={basePosition}
          onClick={handleMapCordClick}
        >
          {areaPinsArray.length &&
            areaPinsArray.map((pin: IMarkerModal) => (
              <Marker
                key={pin.coords.lat}
                position={pin.coords}
                anchorPoint={pin.coords}
                onClick={() => mapPinClickHandler(pin)}
                background={pinColors[pin.category]}
              />
            ))}
          {open && (
            <InfoWindow
              position={activePinCoords ? activePinCoords : basePosition}
              onCloseClick={() => setOpen(false)}
            >
              <DefaultMaker />
            </InfoWindow>
          )}
        </Map>
        {isOpenModalWindow && <MarkerModal />}
      </div>
    </APIProvider>
  );
};

export default GoogleMapContainer;
