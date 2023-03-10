import { useState } from 'react'
import './App.css'
import { Map } from '@esri/react-arcgis'
import Locations from './Locations'
import AddLocation from './AddLocation'
import Widgets from './Widgets'
import AddRandomLocations from './AddRandomLocations'

function App() {
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
      <Map
        style={{ width: '100%', height: '100vh' }}
        mapProperties={mapProps}
        viewProperties={viewProps}
      >
        <Locations />
        <AddLocation />
        <Widgets />
        <AddRandomLocations />
      </Map>
    </div>
  )
}

export default App
