import React, { useEffect } from 'react'
import { loadModules } from 'esri-loader'
function Widgets({ view }) {
  useEffect(() => {
    loadModules([
      'esri/widgets/Home',
      'esri/widgets/BasemapToggle',
      'esri/widgets/ScaleBar',
    ]).then(([Home, BasemapToggle, scaleBar]) => {
      let homeWidget = new Home({
        view: view,
      })
      let basemapToggleWidget = new BasemapToggle({
        view: view,
        nextBasemap: 'topo',
      })
      let scaleBarWidget = new scaleBar({
        view: view,
      })
      view.ui.add(homeWidget, 'top-left')
      view.ui.add(basemapToggleWidget, 'bottom-right')
      view.ui.add(scaleBarWidget, 'bottom-left')
    })
  }, [])
  return null
}

export default Widgets
