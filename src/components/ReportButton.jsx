import './ReportButton.css'

export default function ReportButton({ onClick }) {
  return (
    <button
      className="report-button"
      onClick={onClick}
      aria-label="Reportar un bache"
    >
      <span className="report-button__icon">+</span>
      <span className="report-button__text">Reportar bache</span>
    </button>
  )
}