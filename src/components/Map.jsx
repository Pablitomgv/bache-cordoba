import { MapContainer, TileLayer } from 'react-leaflet'

// Coordenadas del centro de Córdoba Capital
const CORDOBA_CENTER = [-31.4201, -64.1888]
const ZOOM_INICIAL = 14

export default function Map() {
  return (
    <MapContainer
      center={CORDOBA_CENTER}
      zoom={ZOOM_INICIAL}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}