import { useState } from 'react'
import './ReportForm.css'

export default function ReportForm({ onClose }) {
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [coords, setCoords] = useState(null)
  const [description, setDescription] = useState('')
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleGetLocation = () => {
    setLoadingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError('Tu navegador no soporta geolocalización')
      setLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLoadingLocation(false)
      },
      (error) => {
        setLocationError('No pudimos obtener tu ubicación: ' + error.message)
        setLoadingLocation(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos del reporte:', { photo, coords, description })
    alert('Datos capturados. Falta guardarlos en la base de datos.')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Reportar un bache</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} className="report-form">
          {/* Foto */}
          <div className="form-group">
            <label htmlFor="photo">Foto del bache</label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoChange}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Vista previa"
                className="photo-preview"
              />
            )}
          </div>

          {/* Ubicación */}
          <div className="form-group">
            <label>Ubicación</label>
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={loadingLocation}
              className="btn-location"
            >
              {loadingLocation
                ? 'Obteniendo ubicación...'
                : coords
                ? '✓ Ubicación capturada'
                : 'Usar mi ubicación actual'}
            </button>
            {coords && (
              <p className="coords-info">
                {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
              </p>
            )}
            {locationError && (
              <p className="error-message">{locationError}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label htmlFor="description">Descripción (opcional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: bache grande en la esquina, peligroso para motos"
              rows={3}
            />
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="btn-submit"
            disabled={!photo || !coords}
          >
            Enviar reporte
          </button>
          {(!photo || !coords) && (
            <p className="form-hint">
              Necesitás al menos una foto y la ubicación para enviar
            </p>
          )}
        </form>
      </div>
    </div>
  )
}