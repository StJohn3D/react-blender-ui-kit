import React from 'react'

const handleMouseOver = (e) => {

}

const handleMouseUp = (e) => {

}

export default ({panelID, merge}) => {
    if ( !merge.isMerging ) return false

    return (<div
        className='ruip-merge-from-left'
        onMouseOver={handleMouseOver.bind(this)}
        onMouseUp={handleMouseUp.bind(this)}
    ></div>)
}