import React from 'react'
import HighVolumeStore from '../utils/high-volume-store'

const handleMouseDown = (panelID, parentContainerFlow, e) => {
    e.preventDefault()
    const sensitiviy = 20
    const startX = HighVolumeStore.mouseX
    const startY = HighVolumeStore.mouseY
    setTimeout(() => {
        const newX = HighVolumeStore.mouseX
        const newY = HighVolumeStore.mouseY
        const xDelta = Math.abs( newX - startX)
        const yDelta = Math.abs( newY - startY)
        if (xDelta > sensitiviy || yDelta > sensitiviy) { // SJ: We're either splitting or merging
            if ( xDelta > yDelta ) { // SJ: We're either splitting or merging horizontally
                if ( newX < startX ) { // SJ: We're splitting horizontally
                    console.log('split H')
                } else { //: We're merging horizontally
                    console.log('merge H')
                }
            } else { // SJ: We're either splitting or merging vertically
                if ( newY > startY ) { // SJ: We're splitting vertically
                    console.log('split V')
                } else { //: We're merging vertically
                    console.log('merge V')
                }
            }
        }
    }, 200)
}

/* TODO:    Should subscribe for a mouse up event and pole
            This way a user can click, hover, decide, and then either
            cancel by releasing or continue by dragging beyond the threshold
 */

export default ({panelID, parentContainerFlow}) => {
    return (
        <div className='ruip-corner' onMouseDown={handleMouseDown.bind(this, panelID, parentContainerFlow)}/>
    )
}