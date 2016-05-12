import generateID from './generate-id'
import { beginResizing, doneResizing } from '../actions/ui-actions'

export default class HighVolumeStore {

	static _mouseLB = 'UP'
    static _mouseMB = 'UP'
    static _mouseRB = 'UP'
    static _mouseX = 0
	static _mouseY = 0
	static _resizeMoments = []

	static _mouseDown(e) {
        switch (e.button) {
            case 0:
                HighVolumeStore._mouseLB = 'DOWN'
                HighVolumeStore._emitChange('MOUSE_LB_DOWN')
                break
            case 1:
                HighVolumeStore._mouseMB = 'DOWN'
                HighVolumeStore._emitChange('MOUSE_MB_DOWN')
                break
            case 2:
                HighVolumeStore._mouseRB = 'DOWN'
                HighVolumeStore._emitChange('MOUSE_RB_DOWN')
                break
        }
    }
    static _mouseUp(e) {
        switch (e.button) {
            case 0:
                HighVolumeStore._mouseLB = 'DOWN'
                HighVolumeStore._emitChange('MOUSE_LB_UP')
                break
            case 1:
                HighVolumeStore._mouseMB = 'DOWN'
                HighVolumeStore._emitChange('MOUSE_MB_UP')
                break
            case 2:
                HighVolumeStore._mouseRB = 'DOWN'
                HighVolumeStore._emitChange('MOUSE_RB_UP')
                break
        }
    }
    static _mouseMoved(e) {
		HighVolumeStore._mouseX = e.clientX
		HighVolumeStore._mouseY = e.clientY
		HighVolumeStore._emitChange('MOUSE_MOVED');
	}
	static _windowOnResize(e, dispatch) {
		const thisMoment = Date.now()
		HighVolumeStore._resizeMoments.push(thisMoment)
		if (HighVolumeStore._resizeMoments.length === 1) dispatch(beginResizing())

		setTimeout(() => {
			const lastMoment = HighVolumeStore._resizeMoments[HighVolumeStore._resizeMoments.length -1]
			if (lastMoment === thisMoment) {
				HighVolumeStore._resizeMoments = []
				dispatch(doneResizing())
			}
		}, 300)
	}
	static _subscribers = {}
	static _emitChange(event) {
		var handlerIDs = Object.keys( HighVolumeStore._subscribers );
		handlerIDs.forEach(function(id) {
			if (typeof(HighVolumeStore._subscribers[ id ]) === 'function') {
				HighVolumeStore._subscribers[ id ]( event || 'change' );
			}
		});
	}

    static get mouseLB() {
        return HighVolumeStore._mouseLB
    }

    static get mouseMB() {
        return HighVolumeStore._mouseMB
    }

    static get mouseRB() {
        return HighVolumeStore._mouseRB
    }

	static get mouseX() {
		return HighVolumeStore._mouseX
	}

	static get mouseY() {
		return HighVolumeStore._mouseY
	}

	static get isWindowResizing() {
		return HighVolumeStore._isWindowResizing
	}

	static subscribe(callback) {
		var handlerID = generateID();
		HighVolumeStore._subscribers[ handlerID ] = callback;
		return function() {
			delete HighVolumeStore._subscribers[ handlerID ];
		}
	}
}
