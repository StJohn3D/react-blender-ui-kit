import React from 'react'
import { connect } from 'react-redux'
import HighVolumeStore from '../utils/high-volume-store'
import { splitPanel } from '../actions/layout-actions'
import { beginResizing, startMerge } from '../actions/ui-actions'
import generateID from '../utils/generate-id'
import { layout } from '../utils/layout'
import intent from '../constants/container-flows'

const handleMouseDown = (panelID, parentContainerFlow, dispatch, index, e) => {
    e.preventDefault()
    const props = layout(index).getProps(panelID)
    const sensitivity = 20
    const startX = HighVolumeStore.mouseX
    const startY = HighVolumeStore.mouseY

    const merge = ( intent ) => {
        dispatch(startMerge({
            panelID,
            intent
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
        dispatch(beginResizing(resizeID))
    }
    
    const onMouseUP = () => {
        removeSubscription()
    }
    
    const onMouseMove = () => {
        const newX = HighVolumeStore.mouseX
        const newY = HighVolumeStore.mouseY
        const xDelta = Math.abs( newX - startX)
        const yDelta = Math.abs( newY - startY)


        if (xDelta > sensitivity || yDelta > sensitivity) { // SJ: We're either splitting or merging
            if ( xDelta > yDelta ) { // SJ: We're either splitting or merging horizontally
                if ( newX < startX ) { // SJ: We're splitting horizontally
                    split( intent.HORIZONTAL )
                    removeSubscription()
                } else { //: We're merging horizontally
                    merge( intent.HORIZONTAL )
                    removeSubscription()
                }
            } else { // SJ: We're either splitting or merging vertically
                if ( newY > startY ) { // SJ: We're splitting vertically
                    split( intent.VERTICAL )
                    removeSubscription()
                } else { //: We're merging vertically
                    merge( intent.VERTICAL )
                    removeSubscription()
                }
            }
        }
    }
    
    const handleMouseEvents = (event) => {
        switch (event) {
            case 'MOUSE_MOVED':
                return onMouseMove()
            case 'MOUSE_LB_UP':
                return onMouseUP()
            default:
                break
        }
    }

    const removeSubscription = HighVolumeStore.subscribe(handleMouseEvents)
}

const mapStateToProps = state => ({
    index : state.repanel.index
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