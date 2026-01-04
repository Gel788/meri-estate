import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PropertyDetail from './PropertyDetail'
import './MapView.css'

// Fix для иконок Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Кастомная иконка маркера
const createCustomIcon = (isActive = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-pin ${isActive ? 'active' : ''}">
        <div class="marker-content">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
            <circle cx="12" cy="9" r="3" fill="white"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  })
}

function MapController({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  return null
}

export default function MapView({ properties, favorites, toggleFavorite, onNavigate }) {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [mapCenter, setMapCenter] = useState([55.7558, 37.6173])
  const [mapZoom, setMapZoom] = useState(11)

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)} млн ₽`
    }
    return `${(price / 1000).toFixed(0)} тыс ₽`
  }

  const handleMarkerClick = (property) => {
    setSelectedProperty(property)
    setMapCenter([property.coordinate.lat, property.coordinate.lng])
    setMapZoom(14)
  }

  const handleCardClick = () => {
    setShowDetail(true)
  }

  return (
    <div className="map-view">
      <nav className="breadcrumb-nav">
        <button onClick={() => onNavigate && onNavigate('home')} className="breadcrumb-link">
          Главная
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Карта</span>
      </nav>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        zoomControl={true}
      >
        <MapController center={mapCenter} zoom={mapZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.coordinate.lat, property.coordinate.lng]}
            icon={createCustomIcon(selectedProperty?.id === property.id)}
            eventHandlers={{
              click: () => handleMarkerClick(property),
            }}
          >
            <Popup>
              <div className="map-popup">
                <h4>{property.title}</h4>
                <p className="popup-price">{formatPrice(property.price)}</p>
                <p className="popup-location">{property.address}</p>
                <div className="popup-stats">
                  <span>🛏️ {property.rooms}</span>
                  <span>📐 {property.area} м²</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Selected property card */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            className="map-property-card"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={handleCardClick}
          >
            <button
              className="card-close"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedProperty(null)
              }}
            >
              ✕
            </button>

            <div className="card-content">
              <div className="card-image">
                {selectedProperty.typeName === 'Квартира' && '🏢'}
                {selectedProperty.typeName === 'Дом' && '🏠'}
                {selectedProperty.typeName === 'Студия' && '📐'}
                {selectedProperty.typeName === 'Пентхаус' && '⭐'}
                {selectedProperty.typeName === 'Вилла' && '🏡'}
              </div>

              <div className="card-info">
                <h4 className="card-title">{selectedProperty.title}</h4>
                <div className="card-location">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2.5 6C2.5 3.5 4.5 1.5 8 1.5C11.5 1.5 13.5 3.5 13.5 6C13.5 9.5 8 14.5 8 14.5C8 14.5 2.5 9.5 2.5 6Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{selectedProperty.address}</span>
                </div>

                <div className="card-stats">
                  <span>🛏️ {selectedProperty.rooms}</span>
                  <span>📐 {selectedProperty.area} м²</span>
                </div>

                <div className="card-price">
                  {selectedProperty.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>

              <button
                className="card-favorite"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(selectedProperty.id)
                }}
              >
                {favorites.has(selectedProperty.id) ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="card-action">
              <span>Нажмите для подробностей</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-color" />
          <span>{properties.length} объектов на карте</span>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {showDetail && selectedProperty && (
          <PropertyDetail
            property={selectedProperty}
            onClose={() => setShowDetail(false)}
            isFavorite={favorites.has(selectedProperty.id)}
            onToggleFavorite={() => toggleFavorite(selectedProperty.id)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
