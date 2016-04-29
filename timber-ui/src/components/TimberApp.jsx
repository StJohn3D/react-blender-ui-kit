import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doneResizing } from '../actions/resize-actions'
import { registerTools } from '../actions/registry-actions'
import HighVolumeStore from '../utils/high-volume-store'

class TimberApp extends Component {
    render() {
        const { children, onMouseMove } = this.props
        const container = React.Children.only(children)
        return (
            <div className="timber-ui" onMouseMove={onMouseMove} onMouseUp={this.onMouseUp}>
                {container}
            </div>
        );
    }

    componentWillMount() {
        const { onWindowResize, dispatch, tools } = this.props
        window.addEventListener('resize', onWindowResize);

        if ( tools.length ) {
            dispatch(registerTools({
                tools: tools
            }))
        }
    }

    onMouseUp = (e) => {
        const { isResizing, dispatch } = this.props
        if ( isResizing ) dispatch(doneResizing(e))
    }
}

const mapStateToProps = state => ({
    isResizing: state.timberUI.resize.isResizing
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

export default connect(mapStateToProps, mapDispatchToProps)(TimberApp);
