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

const GoogleMapContainer = () => {
  const { basePosition, handleMapCordClick, setOpen, open, isOpenModalWindow } =
    useMap();

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
          {/* @ts-ignore */}
          <Marker
            position={basePosition}
            anchorPoint={basePosition}
            onClick={() => setOpen(true)}
          >
            <Pin />
          </Marker>
          {open && (
            <InfoWindow
              position={basePosition}
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
