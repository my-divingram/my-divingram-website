import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
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

    const markersByLocation = new Map(markers.map(m => [m.location, m]));
    const isFiltering = markers.some(m => m.isDimmed);
    const clusterRefreshKey = isFiltering
        ? markers.filter(m => !m.isDimmed).map(m => m.location).join(',')
        : 'all-visible';

    const createClusterCustomIcon = (cluster) => {
        const childMarkers = cluster.getAllChildMarkers();
        const uniqueSpecies = new Set();
        let maxCount = -1;
        let topLocation = "";
        let isClusterDimmed = false;

        if (isFiltering) {
            isClusterDimmed = childMarkers.every(marker => {
                const locationName = marker.options.title;
                const data = markersByLocation.get(locationName);
                return data ? data.isDimmed : true;
            });
        }

        childMarkers.forEach(marker => {
            const locationName = marker.options.title;
            const data = markersByLocation.get(locationName);

            if (data) {
                data.speciesIds.forEach(id => uniqueSpecies.add(id));
                if (data.speciesCount > maxCount) {
                    maxCount = data.speciesCount;
                    topLocation = data.location;
                }
            }
        });

        const totalCount = uniqueSpecies.size;

        let c = ' marker-cluster-';
        if (totalCount < 100) { c += 'small'; }
        else if (totalCount < 500) { c += 'medium'; }
        else { c += 'large'; }

        const opacityStyle = isClusterDimmed ? 'opacity: 0.6;' : 'opacity: 1;';

        return L.divIcon({
            html: `
                <div style="${opacityStyle}">
                    <span>${totalCount}<span style="font-size: 10px; font-weight: 600; margin-left: 1px; display: inline !important;"> 種</span></span>
                    <span>
                        ${topLocation}${totalCount > 1 ? 'など' : ''}
                    </span>
                </div>
            `,
            className: 'marker-cluster' + c,
            iconSize: L.point(0, 0),
            iconAnchor: [0, 0]
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
                attribution='&copy; CARTO'
            />
            <MarkerClusterGroup
                key={clusterRefreshKey}
                spiderfyOnMaxZoom={true}
                showCoverageOnHover={false}
                iconCreateFunction={createClusterCustomIcon}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.location}
                        position={[marker.lat, marker.lng]}
                        title={marker.location}
                        eventHandlers={{ click: () => onMarkerClick(marker.location) }}
                        icon={createSinglePinIcon(marker)}
                        zIndexOffset={marker.isDimmed ? 0 : 1000}
                    />
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}