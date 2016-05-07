import React from 'react'
import generateID from '../utils/generate-id'

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
                    parentID: parentID,
                    parentIndex,
                    flow: child.props.flow,
                    minWidth: child.props.minWidth
                }
                React.Children.toArray(child.props.children).map(recursiveParse.bind(this, id))
                break
            case 'Panel':
                index[id] = {
                    type: 'Panel',
                    parentID: parentID,
                    parentIndex,
                    toolIndex: child.props.toolIndex,
                }
                React.Children.toArray(child.props.children).map(recursiveParse.bind(this, id))
                break
            default:
                index[id] = {
                    type: 'Unknown',
                    parentID: parentID,
                    parentIndex,
                    component: child
                }
                break
        }
    }
    recursiveParse('ROOT', child)

    return index
}

export const layout = (index) => {
    return {
        rootID() {
            return Object.keys(index).find(function(key) {
                return index[key].parentID === 'ROOT'
            })
        },
        getProps(id) {
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
                children,
            })
        }
    }
}