import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

export default function LocationMap({ markers, onMarkerClick }) {
    if (!markers || markers.length === 0) {
        return <p>地図データを読み込めません。</p>;
    }

    // 地図の中心を計算（ここでは日本の中心あたりを仮置き）
    const center = [35.6809591, 139.7673068];

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
            html: `<div><span>${count}</span></div>`, // 重複なしの種数を表示
            className: 'marker-cluster' + c,
            iconSize: new L.Point(40, 40)
        });
    };

    const createSinglePinIcon = (location, count) => {
       return L.divIcon({
            html: `<div class="custom-single-pin" style="transform: translate(-50%, -50%);">${location}<span>${count}種</span></div>`,
            className: '', // Leafletのデフォルトスタイルを無効化
            iconSize: [0, 0], // 親コンテナはサイズ0
            iconAnchor: [0, 0] // 座標の位置を基準にする
        });
    };

    return (
        <MapContainer center={center} zoom={5} className="w-full h-[300px] md:h-[400px]" worldCopyJump={true}>
           <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

           <MarkerClusterGroup
                spiderfyOnMaxZoom={true}
                showCoverageOnHover={false}
                iconCreateFunction={createClusterCustomIcon} // 2. クラスター時の関数を指定
            >

                {markers.map(marker => (
                    <Marker
                        key={marker.location}
                        position={[marker.lat, marker.lng]}
                        // --- ピンクリック時のイベントハンドラ ---
                        eventHandlers={{
                            click: () => {
                                onMarkerClick(marker.location);
                            },
                        }}
                        icon={createSinglePinIcon(marker.location, marker.speciesCount)}
                    >
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}