import React, { useEffect, useRef, useState } from 'react'
import { loadModules } from 'esri-loader'
import { faker } from '@faker-js/faker'
import './App.css'
import { Link } from 'react-router-dom'
function AddRandomLocations({ map, view, setCountryState }) {
  const addRandomLocationDiv = useRef(null)
  const [country, setCountry] = useState({
    name: '',
    time_zone: '',
  })

  const locations = []
  for (let index = 0; index < 10; index++) {
    locations.push({
      name: faker.address.country(),
      time_zone: faker.address.timeZone(),
      geo: {
        type: 'point',
        x: faker.address.longitude(),
        y: faker.address.latitude(),
      },
      sym: {
        type: 'simple-marker',
        color: 'yellow',
        size: '15',
      },
    })
  }
  const myGraphObj = {
    geo: {
      type: 'point',
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
    },
    sym: {
      type: 'simple-marker',
      color: 'green',
      size: '15',
    },
    name: faker.address.country(),
    time_zone: faker.address.timeZone(),
  }

  useEffect(() => {
    loadModules([
      'esri/Graphic',
      'esri/layers/GraphicsLayer',
      'esri/PopupTemplate',
    ]).then(([Graphic, GraphicsLayer, PopupTemplate]) => {
      let randomPopupTemplate = new PopupTemplate({
        title: faker.address.country(),
        content: faker.address.timeZone(),
      })
      console.log('random popup', randomPopupTemplate)
      let randomGraphics = locations.map((location) => {
        return new Graphic({
          geometry: location.geo,
          symbol: location.sym,
          attributes: {
            title: location.name,
            content: location.time_zone,
          },
          popupTemplate: {
            title: location.name,
            content: location.time_zone,
          },
        })
      })
      let myGraph = new Graphic({
        geometry: myGraphObj.geo,
        symbol: myGraphObj.sym,
        popupTemplate: randomPopupTemplate,
      })

      let randomLayer = new GraphicsLayer({
        id: '3',
        title: 'random1',
        graphics: [...randomGraphics, myGraph],
      })

      view.on('click', (event) => {
        view.hitTest(event).then((response) => {
          if (response.results.length > 0) {
            setCountry({
              name: response.results[0].graphic.attributes.title,
              time_zone: response.results[0].graphic.attributes.content,
            })
            view.ui.add(addRandomLocationDiv.current, 'bottom-left')
          }
        })
      })
      map.layers.add(randomLayer)
    })
  }, [])
  return (
    <div
      className='esri-widget'
      ref={addRandomLocationDiv}
      style={{
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        minWidth: '24vw',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
    >
      <p className='esri-widget__heading'>{country.name}</p>
      <p className='esri-widget__heading'>{country.time_zone}</p>
      <Link to='/details'>
        <p
          className='more-details'
          onClick={() => {
            setCountryState({
              name: country.name,
              time_zone: country.time_zone,
            })
          }}
        >
          More Detailes...
        </p>
      </Link>
    </div>
  )
}

export default AddRandomLocations
