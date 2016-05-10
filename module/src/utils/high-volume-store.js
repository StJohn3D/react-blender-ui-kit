import generateID from './generate-id'
import { beginResizing, doneResizing } from '../actions/ui-actions'

export default class HighVolumeStore {

	static _mouseX = 0
	static _mouseY = 0
	static _resizeMoments = []

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
