import React, { useEffect } from 'react'
import { loadModules } from 'esri-loader'
function Widgets({ view }) {
  useEffect(() => {
    loadModules([
      'esri/widgets/Home',
      'esri/widgets/BasemapToggle',
      'esri/widgets/ScaleBar',
      'esri/widgets/Search',
    ]).then(([Home, BasemapToggle, scaleBar, Search]) => {
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
      let SearchWidget = new Search({
        view: view,
      })
      view.ui.add(homeWidget, 'top-left')
      view.ui.add(basemapToggleWidget, 'bottom-right')
      view.ui.add(SearchWidget, 'top-right')
      // view.ui.add(scaleBarWidget, 'bottom-left')
    })
  }, [])
  return null
}

export default Widgets
