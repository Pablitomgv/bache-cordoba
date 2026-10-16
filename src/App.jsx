import { useState } from 'react'
import Map from './components/Map.jsx'
import ReportButton from './components/ReportButton.jsx'
import ReportForm from './components/ReportForm.jsx'

function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Map />
      <ReportButton onClick={() => setShowForm(true)} />
      {showForm && <ReportForm onClose={() => setShowForm(false)} />}
    </>
  )
}

export default App