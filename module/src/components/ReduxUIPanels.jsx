import React, { Component } from 'react'
import { connect } from 'react-redux'
import generateID from '../utils/generate-id'
import { doneResizing } from '../actions/resize-actions'
import { registerTools, initiateLayout } from '../actions/registry-actions'
import HighVolumeStore from '../utils/high-volume-store'
import styles from '../styles/'
import jss from 'js-stylesheet'

const getChildName = (child) => {
    let name = undefined
    if ( child.type.WrappedComponent && child.type.WrappedComponent.name ) {
        name = child.type.WrappedComponent.name
    } else name = child.type.displayName

    return name
}

const parseChildrenForLayout = (child) => {
    const name = getChildName(child)

    switch (name) {
        case 'Container':
            return {
                type: 'Container',
                id: generateID('Container'),
                flow: child.props.flow,
                minWidth: child.props.minWidth,
                children: React.Children.toArray(child.props.children).map(parseChildrenForLayout)
            }
        case 'Panel':
            return {
                type: 'Panel',
                id: generateID('Panel'),
                toolIndex: child.props.toolIndex,
                children: React.Children.toArray(child.props.children).map(parseChildrenForLayout)
            }
        default:
            return {
                type: 'Unknown',
                id: generateID('Unknown'),
                props: child.props
            }
    }
}

class ReduxUIPanels extends Component {
    render() {
        const { children, onMouseMove } = this.props
        const container = React.Children.only(children)
        return (
            <div className="redux-ui-panels" onMouseMove={onMouseMove} onMouseUp={this.onMouseUp}>
                {container}
            </div>
        );
    }

    componentWillMount() {
        const { onWindowResize, dispatch, tools, children } = this.props
        window.addEventListener('resize', onWindowResize);

        if (  tools && tools.length ) {
            dispatch(registerTools({
                tools: tools
            }))
        }

        if ( children && React.Children.count(children) === 1 ) {
            const child = React.Children.only(children)

            dispatch(initiateLayout({
                layout: parseChildrenForLayout(child)
            }))
        }

        // SJ: Apply Timber's CSS
        jss(styles)
    }

    onMouseUp = (e) => {
        const { isResizing, dispatch } = this.props
        if ( isResizing ) dispatch(doneResizing(e))
    }
}

const mapStateToProps = state => ({
    isResizing: state.ReduxUIPanels.resize.isResizing
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onMouseMove: (e) => {
            HighVolumeStore._mouseMoved(e)
        },
        onWindowResize: (e) => {
            HighVolumeStore._windowOnResize(e, dispatch)
        },
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxUIPanels);
