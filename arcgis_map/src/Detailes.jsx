import React from 'react'

function Detailes({ country }) {
  console.log('detailes', country)
  return (
    <div
      className='esri-widget'
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ marginBottom: '30px' }}>{country.name}</h1>
      <h1>{country.time_zone}</h1>
    </div>
  )
}

export default Detailes
