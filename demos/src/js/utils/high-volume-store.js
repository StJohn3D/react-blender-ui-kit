import generateID from './generate-id'

export default class HighVolumeStore {

	static _mouseX = 0
	static _mouseY = 0
	static _isWindowResizing = false
	static _lastResizedTimeStamp = null

	static _mouseMoved(e) {
		HighVolumeStore._mouseX = e.clientX
		HighVolumeStore._mouseY = e.clientY
		HighVolumeStore._emitChange('MOUSE_MOVED');
	}
	static _windowOnResize() {
		HighVolumeStore._lastResizedTimeStamp = Date.now();
		if (HighVolumeStore._isWindowResizing) {
			setTimeout(function() {
				if (HighVolumeStore._lastResizedTimeStamp + 1000 < Date.now()) {
					HighVolumeStore._isWindowResizing = false
					HighVolumeStore._emitChange('WINDOW_RESIZED');
				}
			}, 1000)
		} else {
			HighVolumeStore._isWindowResizing = true
			HighVolumeStore._emitChange('WINDOW_RESIZING');
		}
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