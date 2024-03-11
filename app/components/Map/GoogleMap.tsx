'use client';

import {
  APIProvider,
  Map,
  Marker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { mapLayout } from '@/app/components/Map/assets/mapStyle';
import { useAppSelector } from '@/app/hooks/redux';

const GoogleMapContainer = () => {
  const [open, setOpen] = useState(false);
  const basePosition = useAppSelector((state) => state.geolocation.center);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC__GOOGLEMAPS_API_KEY!}>
      <div className={'w-screen h-screen'}>
        <Map
          styles={mapLayout}
          controlled={false}
          disableDefaultUI
          defaultZoom={13}
          defaultCenter={basePosition}
          center={basePosition}
        >
          <Marker position={basePosition} onClick={() => setOpen(true)}>
            <Pin />
          </Marker>
          {open && (
            <InfoWindow
              position={basePosition}
              onCloseClick={() => setOpen(false)}
            >
              <div style={{ color: '#f3c' }}>
                <h1>San Francisco</h1>
                <p>Home of GitHub</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMapContainer;
