import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function Map({ coords }) {
  const { lat, lng } = coords;

  return (
    <MapContainer center={[lat, lng]} zoom={12} style={{ height: "70vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {lat && lng && <Marker position={[lat, lng]} />}
    </MapContainer>
  );
}
