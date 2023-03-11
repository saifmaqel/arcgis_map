import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { Map } from '@esri/react-arcgis'
import Locations from './Locations'
import AddLocation from './AddLocation'
import Widgets from './Widgets'
import AddRandomLocations from './AddRandomLocations'
import { Routes, Route } from 'react-router-dom'
import Detailes from './Detailes'

function App({ view }) {
  const [countryState, setCountryState] = useState({ name: '', time_zone: '' })
  console.log('country state', countryState)
  const mapProps = {
    basemap: 'dark-gray',
  }
  const viewProps = {
    zoom: 1,
    center: [122.4443, 47.2529],
    scale: 50000000,
  }

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Map
              style={{ width: '100%', height: '100vh' }}
              mapProperties={mapProps}
              viewProperties={viewProps}
            >
              <Locations />
              <AddLocation />
              <Widgets />
              <AddRandomLocations setCountryState={setCountryState} />
            </Map>
          }
        />

        <Route path='/details' element={<Detailes country={countryState} />} />
      </Routes>
    </div>
  )
}

export default App
