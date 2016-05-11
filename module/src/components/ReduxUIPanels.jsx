import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doneResizing } from '../actions/ui-actions'
import HighVolumeStore from '../utils/high-volume-store'
import styles from '../styles/'
import jss from 'js-stylesheet'
import Container from './Container'
import { initiateLayout } from '../actions/layout-actions'
import { generateIndexFrom, layout } from '../utils/layout'



class ReduxUIPanels extends Component {
    render() {
        const { index, onMouseMove } = this.props
        return (
            <div className="redux-ui-panels"
                 onMouseMove={onMouseMove}
                 onMouseUp={this.onMouseUp}
                 onMouseDown={this.onMouseDown}
            >
                <Container id={layout(index).rootID()}/>
            </div>
        );
    }

    componentWillMount() {
        const { onWindowResize, dispatch, tools, children } = this.props
        window.addEventListener('resize', onWindowResize);

        if ( children && React.Children.count(children) === 1 ) {
            const child = React.Children.only(children)
            const toolArray = tools && tools.length ? tools : []

            dispatch(initiateLayout({
                tools: toolArray,
                index: generateIndexFrom(child)
            }))
        }

        // SJ: Apply Timber's CSS
        jss(styles)
    }

    onMouseDown = (e) => {
        HighVolumeStore._mouseDown(e)
    }

    onMouseUp = (e) => {
        HighVolumeStore._mouseUp(e)
        const { isResizing, dispatch } = this.props
        if ( isResizing ) dispatch(doneResizing(e))
    }
}

const mapStateToProps = state => ({
    isResizing: state.ReduxUIPanels.resize.isResizing,
    index: state.ReduxUIPanels.index
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
