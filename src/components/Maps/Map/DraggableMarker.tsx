import L from "leaflet";
import ReactDOM from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import { MapMarker } from "../../../custom-types";

export default function DraggableMarker({
  icon,
  color,
  text,
  x,
  y,
}: Omit<MapMarker, "id" | "map_id">) {
  return (
    <Marker
      eventHandlers={{
        contextmenu: (e: any) => {
          alert("BZZZZ");
        },
      }}
      position={[x, y]}
      icon={L.divIcon({
        popupAnchor: [18, 0],
        className: "bg-transparent  relative ",
        html: ReactDOM.renderToString(
          <div
            className="text-xl w-2rem h-2rem absolute"
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              alert("BZZZZZ");
            }}
          >
            <div
              style={{
                zIndex: 999999,
                background: `url('https://api.iconify.design/mdi/${icon}.svg?color=${color}') no-repeat`,
                backgroundSize: "2rem",
                backgroundPosition: "center",
                backgroundColor: "black",
              }}
              className="w-full h-full absolute border-circle p-4"
            ></div>
          </div>
        ),
      })}
    >
      {text && <Popup position={[51.505, -0]}>{text}</Popup>}
    </Marker>
  );
}
