import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Map } from "../../custom-types";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
} from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet";
export default function MapView() {
  const { project_id, map_id } = useParams();
  const queryClient = useQueryClient();
  const cm = useRef(null);
  const imgRef = useRef() as any;
  const [mapData, setMapData] = useState({ width: 0, height: 0, src: "" });
  const [bounds, setBounds] = useState<LatLngBoundsExpression>([
    [0, 0],
    [0, 0],
  ]);
  const maps: Map[] | undefined = queryClient.getQueryData(
    `${project_id}-maps`
  );
  useEffect(() => {
    if (map_id) {
      const map = maps?.find((m) => m.id === map_id);
      if (map) {
        let img = new Image();
        img.src = map.map_image;
        img.onload = () => {
          setBounds([
            [0 - img.height, 0 - img.width],
            [img.height, img.width],
          ]);
          setMapData({
            width: img.width,
            height: img.height,
            src: map.map_image,
          });
        };
      }
    }
  }, [map_id]);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setBounds([
        [0 - mapData.height, 0 - mapData.width],
        [mapData.height, mapData.width],
      ]);
    }
  }, [bounds]);
  return (
    <div className="w-10 h-screen">
      {mapData.width && mapData.height && (
        <MapContainer
          className="w-full h-full bg-gray-900"
          center={[mapData.width / 2, mapData.height / 2]}
          zoom={0}
          minZoom={-3}
          scrollWheelZoom={true}
          crs={L.CRS.Simple}
          bounds={bounds}
        >
          <ImageOverlay url={mapData.src} bounds={bounds} ref={imgRef} />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}
