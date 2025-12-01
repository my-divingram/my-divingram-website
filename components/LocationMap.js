import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import React from 'react';

function MapController({ center, zoom }) {
    const map = useMap();

    React.useEffect(() => {
        if (center) {
            const targetZoom = (zoom !== undefined && zoom !== null) ? zoom : map.getZoom();
            map.setView(center, targetZoom);
        }
    }, [center, zoom, map]);

    return null;
}

export default function LocationMap({ markers, onMarkerClick, center, zoom }) {

    const defaultCenter = [35.6809591, 139.7673068];
    const defaultZoom = 4;

    if (!markers || markers.length === 0) {
        return <p>地図データを読み込めません。</p>;
    }

    const createClusterCustomIcon = (cluster) => {
        const childMarkers = cluster.getAllChildMarkers();
        const uniqueSpecies = new Set();
        const markersMap = new Map(
            markers.map(m => [`${m.lat}_${m.lng}`, m.speciesIds])
        );

        childMarkers.forEach(marker => {
            const latLngKey = `${marker.getLatLng().lat}_${marker.getLatLng().lng}`;
            const latestSpeciesIds = markersMap.get(latLngKey);

            if (latestSpeciesIds) {
                latestSpeciesIds.forEach(id => uniqueSpecies.add(id));
            }
        });

        const count = uniqueSpecies.size;

        let c = ' marker-cluster-';
        if (count < 100) { c += 'small'; }
        else if (count < 500) { c += 'medium'; }
        else { c += 'large'; }

        return L.divIcon({
            html: `<div><span>${count}</span></div>`,
            className: 'marker-cluster' + c,
            iconSize: new L.Point(40, 40)
        });
    };

    const createSinglePinIcon = (marker) => {
        const { location, speciesCount, isDimmed } = marker;
        const opacityStyle = isDimmed ? 'opacity: 0.6;' : 'opacity: 1;';

       return L.divIcon({
            html: `<div class="custom-single-pin" style="transform: translate(-50%, -50%); ${opacityStyle}">${location}<span>${speciesCount}種</span></div>`,
            className: '',
            iconSize: [0, 0],
            iconAnchor: [0, 0]
        });
    };

    return (
        <MapContainer
            center={center || defaultCenter}
            zoom={zoom || defaultZoom}
            className="w-full h-[300px] md:h-[400px]"
            worldCopyJump={true}
        >

            <MapController center={center} zoom={zoom} />

            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            <MarkerClusterGroup
                spiderfyOnMaxZoom={true}
                showCoverageOnHover={false}
                iconCreateFunction={createClusterCustomIcon}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.location}
                        position={[marker.lat, marker.lng]}
                        eventHandlers={{
                            click: () => {
                                onMarkerClick(marker.location);
                            },
                        }}
                        icon={createSinglePinIcon(marker)}
                        zIndexOffset={marker.isDimmed ? 0 : 1000}
                    >
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}