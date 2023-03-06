import React, { useRef, useEffect, useState } from 'react'
import { loadModules } from 'esri-loader'

function AddLocation({ view }) {
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
      newPoint.x = latitude
      newPoint.y = longitude
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
      style={{ padding: 10 }}
    >
      <input
        type='text'
        placeholder='Title'
        className='esri-input'
        style={{ margin: 5 }}
        value={point.title}
        name='title'
        onChange={handleChange}
      />
      <br />
      <textarea
        type='text'
        name='details'
        placeholder='Details'
        className='esri-input'
        style={{ margin: 5 }}
        value={point.details}
        cols={19}
        onChange={handleChange}
      ></textarea>
      <br />
      <span style={{ margin: 5 }}>X: {point.x}</span>
      <br />
      <span style={{ margin: 5 }}>Y: {point.y}</span>
      <input
        type='button'
        value='Add Location'
        className='esri-button'
        style={{ margin: 5, width: '95%' }}
        onClick={handleAddLocation}
      />
    </div>
  )
}

export default AddLocation
