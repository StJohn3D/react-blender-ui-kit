import React from 'react'
import generateID from '../utils/generate-id'

const clean = (index) => {
    return index
}

const getProps = (index, id) => {
    let children = []
    let props = {}
    Object.keys(index).forEach(function(key) {
        const item = index[key]
        if ( item.parentID === id ) children[item.parentIndex] = (Object.assign({}, item, {
            id: key
        }))
        else if (id === key) props = item
    })
    return Object.assign({}, props, {
        id,
        children,
    })
}

const getRootID = (index) => {
    return Object.keys(index).find(function(key) {
        return index[key].parentID === 'ROOT'
    })
}

export const generateIndexFrom = (child) => {
    let index = {}

    const getChildName = (child) => {
        let name = undefined
        if ( child.type.WrappedComponent && child.type.WrappedComponent.name ) {
            name = child.type.WrappedComponent.name
        } else name = child.type.displayName

        return name
    }
    const recursiveParse = (parentID, child, parentIndex) => {
        const id = generateID()
        const name = getChildName(child)
        switch (name) {
            case 'Container':
                index[id] = {
                    type: 'Container',
                    parentID,
                    parentIndex,
                    flow: child.props.flow,
                    minWidth: child.props.minWidth
                }
                React.Children.toArray(child.props.children).map(recursiveParse.bind(this, id))
                break
            case 'Panel':
                index[id] = {
                    type: 'Panel',
                    parentID,
                    parentIndex,
                    toolIndex: child.props.toolIndex,
                }
                React.Children.toArray(child.props.children).map(recursiveParse.bind(this, id))
                break
            default:
                index[id] = {
                    type: 'Unknown',
                    parentID,
                    parentIndex,
                    component: child
                }
                break
        }
    }
    recursiveParse('ROOT', child)

    return clean(index)
}

export const layout = (index) => {
    if (!index) {
        const message = 'layout must be called with the index object from the store\ne.g. layout(index)\nFailed with ' + index
        if (console && console.warn) console.warn(message)
        return 'ERROR: ' + message
    }
    return {
        rootID() {
            return getRootID(index)
        },
        getProps(id) {
            return getProps(index, id)
        },
        clean() {
            return clean(index)
        }
    }
}