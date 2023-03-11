import React, { useState, useEffect } from 'react'
import { loadModules } from 'esri-loader'
import { faker } from '@faker-js/faker'
const geosAndSymbols = [
  {
    geo: { type: 'point', x: 50.1, y: 30 },
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

const geosAndSymbols2 = {
  geo: { type: 'point', x: 34.1, y: 29 },
  sym: {
    type: 'simple-marker',
    color: 'yellow',
    size: '15',
  },
}
function Locations({ view, map }) {
  const [graph, setGraph] = useState(null)

  useEffect(() => {
    loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer']).then(
      ([Graphic, GraphicsLayer]) => {
        // Create a polygon geometry
        let graphics = geosAndSymbols.map((geosAndSymbol) => {
          return new Graphic({
            geometry: geosAndSymbol.geo,
            symbol: geosAndSymbol.sym,
          })
        })
        let layer = new GraphicsLayer({
          id: '1',
          title: 'joy',
          graphics: graphics,
        })
        console.log('layer:', layer.id)
        let layer2 = new GraphicsLayer({
          id: '2',
          title: 'edward',
          graphics: new Graphic({
            geometry: geosAndSymbols2.geo,
            symbol: geosAndSymbols2.sym,
          }),
        })
        map.layers.addMany([layer, layer2])
        // view.map.layers.add(layer)
        // view.graphics.addMany(graphics)
        view.goTo(graphics)
      }
    )
  })

  return null
}

export default Locations
