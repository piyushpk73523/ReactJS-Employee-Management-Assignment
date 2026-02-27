import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -35],
  shadowSize: [40, 40],
});

export default function MapPage() {
  const location = useLocation();
  const data = location.state || [];

  const cityCoordinates = {
    Edinburgh: [55.9533, -3.1883],
    Tokyo: [35.6762, 139.6503],
    "San Francisco": [37.7749, -122.4194],
    "New York": [40.7128, -74.006],
    London: [51.5072, -0.1276],
    Singapore: [1.3521, 103.8198],
    Sidney: [-33.8688, 151.2093],
  };

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={2}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {data.map((emp, index) => {
        const baseCoords = cityCoordinates[emp[2]];
        if (!baseCoords) return null;

        // Small offset to prevent overlap
        const offsetCoords = [
          baseCoords[0] + (Math.random() - 0.5) * 1,
          baseCoords[1] + (Math.random() - 0.5) * 1,
        ];

        return (
          <Marker key={index} position={offsetCoords} icon={customIcon}>
            {/* Permanent name label */}
            <Tooltip permanent direction="top" offset={[0, -30]}>
              {emp[0]}
            </Tooltip>

            <Popup>
              <strong>{emp[0]}</strong>
              <br />
              {emp[1]}
              <br />
              {emp[2]}
              <br />
              Salary: {emp[5]}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
