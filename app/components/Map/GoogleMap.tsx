'use client';

import {APIProvider, Map, Marker, Pin, InfoWindow} from "@vis.gl/react-google-maps";
import {useState} from "react";
import {mapLayout} from "@/app/components/Map/assets/mapStyle";

const GoogleMapContainer = () => {
    const position= { lat: 37.7749, lng: -122.4194 };
    const [open, setOpen] = useState(false);
    const apiKey =  process.env.NEXT_PUBLIC__GOOGLEMAPS_API_KEY;
    return (
        <APIProvider apiKey={apiKey!}>
            <div style={{height: '100vh', width:'100vw'}}>
                <Map styles={mapLayout} controlled={false} disableDefaultUI defaultZoom={15} defaultCenter={position}>
                    <Marker position={position} onClick={() => setOpen(true)}>
                        <Pin background={'#fc3'} borderColor={'#f3c'} glyphColor={'red'} />
                    </Marker>
                    {
                        open && (
                            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                                <div style={{color:'#f3c'}}>
                                    <h1>San Francisco</h1>
                                    <p>Home of GitHub</p>
                                </div>
                            </InfoWindow>
                        )
                    }
                </Map>
            </div>
        </APIProvider>
    )
};

export default GoogleMapContainer;
