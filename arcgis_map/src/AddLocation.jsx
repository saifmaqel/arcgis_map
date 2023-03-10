import React, { useRef, useEffect, useState } from 'react'
import { loadModules } from 'esri-loader'
import { faker } from '@faker-js/faker'

function AddLocation({ view, map }) {
  // console.log(view.map.findLayerById(1))
  // const foundLayer = map.allLayers
  console.log(map.layers.items[0])
  const addLocationDiv = useRef(null)
  const [point, setPoint] = useState({
    title: '',
    details: '',
    x: null,
    y: null,
  })
  useEffect(() => {
    view.ui.add(addLocationDiv.current, 'top-right')
    view.on('click', (e) => {
      const { latitude, longitude } = e.mapPoint
      let newPoint = { ...point }
      newPoint.x = longitude
      newPoint.y = latitude
      setPoint(newPoint)
    })
  }, [])
  const handleChange = (e) => {
    const { value, name } = e.target
    let newState = { ...point }
    newState[name] = value
    setPoint(newState)
  }
  const handleAddLocation = (e) => {
    console.log(point)
    loadModules(['esri/Graphic']).then(([Graphic]) => {
      // Create a polygon geometry
      const geosAndSymbols = {
        geo: { type: 'point', x: point.x, y: point.y },
        sym: {
          type: 'simple-marker',
          color: 'blue',
          size: '10',
        },
      }

      let graphic = new Graphic({
        geometry: geosAndSymbols.geo,
        symbol: geosAndSymbols.sym,
        popupTemplate: {
          title: point.title,
          content: point.details,
        },
      })
      view.graphics.add(graphic)
      view.goTo(graphic)
    })
  }
  return (
    <div
      id='add-location'
      className='esri-widget'
      ref={addLocationDiv}
      style={{ padding: 10, display: 'flex', flexFlow: 'wrap', width: '40vw' }}
    >
      <input
        type='text'
        placeholder='Title'
        className='esri-input'
        style={{ margin: '5px', flex: 1, width: '100%' }}
        value={point.title}
        name='title'
        onChange={handleChange}
      />
      <br />
      <input
        type='text'
        name='details'
        placeholder='Details'
        className='esri-input'
        style={{ margin: '5px', flex: 1, width: '100%' }}
        value={point.details}
        onChange={handleChange}
      />
      <br />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '5px',
          marginLeft: '5px',
          width: '100%',
        }}
      >
        <span>X: {point.x}</span>
        <span>Y: {point.y}</span>
      </div>
      <input
        type='button'
        value='Add Location'
        className='esri-button'
        style={{ margin: 5, width: '100%' }}
        onClick={handleAddLocation}
      />
    </div>
  )
}

export default AddLocation
