import React, { useEffect } from 'react'
import { loadModules } from 'esri-loader'
function Widgets({ view }) {
  useEffect(() => {
    loadModules(['esri/widgets/Home', 'esri/widgets/BasemapToggle']).then(
      ([Home, BasemapToggle]) => {
        let homeWidget = new Home({
          view: view,
        })
        let basemapToggleWidget = new BasemapToggle({
          view: view,
          nextBasemap: 'topo',
        })
        view.ui.add(homeWidget, 'top-left')
        view.ui.add(basemapToggleWidget, 'bottom-right')
      }
    )
  }, [])
  return null
}

export default Widgets
