import React from 'react'
import { connect } from 'react-redux'
import HighVolumeStore from '../utils/high-volume-store'
import { splitPanel, mergePanel } from '../actions/layout-actions'
import { beginResizing } from '../actions/resize-actions'
import generateID from '../utils/generate-id'
import { layout } from '../utils/layout'
import { UI } from '../constants/action-types'

const handleMouseDown = (panelID, parentContainerFlow, dispatch, index, e) => {
    e.preventDefault()
    const props = layout(index).getProps(panelID)
    const sensitivity = 20
    const startX = HighVolumeStore.mouseX
    const startY = HighVolumeStore.mouseY

    const merge = ( intent ) => {
        dispatch(mergePanel({
            panelID,
            parentContainerFlow,
            intent,
        }))
    }

    const split = ( intent ) => {
        const resizeID = generateID()
        const { parentID, parentIndex, toolIndex } = props
        dispatch(splitPanel({
            panelID,
            parentContainerFlow,
            intent,
            resizeID,
            parentID,
            parentIndex,
            toolIndex,
        }))
        dispatch(beginResizing(resizeID, parentID))
    }

    setTimeout(() => {
        const newX = HighVolumeStore.mouseX
        const newY = HighVolumeStore.mouseY
        const xDelta = Math.abs( newX - startX)
        const yDelta = Math.abs( newY - startY)


        if (xDelta > sensitivity || yDelta > sensitivity) { // SJ: We're either splitting or merging
            if ( xDelta > yDelta ) { // SJ: We're either splitting or merging horizontally
                if ( newX < startX ) { // SJ: We're splitting horizontally
                    split( UI.SPLIT.HORIZONTAL )
                } else { //: We're merging horizontally
                    merge( UI.MERGE.HORIZONTAL )
                }
            } else { // SJ: We're either splitting or merging vertically
                if ( newY > startY ) { // SJ: We're splitting vertically
                    split( UI.SPLIT.VERTICAL )
                } else { //: We're merging vertically
                    merge( UI.MERGE.VERTICAL )
                }
            }
        }
    }, 200)
}

/* TODO:    Should subscribe for a mouse up event and pole
            This way a user can click, hover, decide, and then either
            cancel by releasing or continue by dragging beyond the threshold
 */

const mapStateToProps = state => ({
    index : state.ReduxUIPanels.index
})

const mapDispatchToProps = (dispatch, props) => {
    return { dispatch, }
}

const Corner = ({panelID, parentContainerFlow, dispatch, index}) => {
    return (
        <div className='ruip-corner' onMouseDown={handleMouseDown.bind(this, panelID, parentContainerFlow, dispatch, index)}/>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Corner)