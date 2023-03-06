import React, { useState, useEffect } from 'react'
import { loadModules } from 'esri-loader'
function Locations({ view }) {
  // const view = props.view
  const [graph, setGraph] = useState(null)
  useEffect(() => {
    loadModules(['esri/Graphic']).then(([Graphic]) => {
      // Create a polygon geometry
      const geosAndSymbols = [
        {
          geo: { type: 'point', x: 100.1, y: 30 },
          sym: {
            type: 'simple-marker',
            color: 'blue',
            size: '5',
          },
        },
        {
          geo: { type: 'point', x: 15.1, y: 30 },
          sym: {
            type: 'simple-marker',
            color: 'red',
            size: '10',
          },
        },
        {
          geo: { type: 'point', x: 33.1, y: 33 },
          sym: {
            type: 'simple-marker',
            color: 'white',
            size: '15',
          },
        },
      ]

      let graphics = geosAndSymbols.map((geosAndSymbol) => {
        return new Graphic({
          geometry: geosAndSymbol.geo,
          symbol: geosAndSymbol.sym,
        })
      })
      view.graphics.addMany(graphics)
      view.goTo(graphics)
    })
  })

  return null
}

export default Locations
