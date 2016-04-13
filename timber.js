'use strict';

var jss = require('js-stylesheet');

module.exports = {
	container: 'Container Component Here',
	panel    : 'Panel Component Here',
	injectCSS: function() {
		jss({
			'.timber-container'        : {
				'width'     : '100%',
				'height'    : '100%',
				'min-height': '200px',
				'display'   : 'table'
			},
			'.timber-row'              : {
				'display': 'table-row'
			},
			'.timber-panel'            : {
				'display'         : 'table-cell',
				'background-color': 'grey',
				'border'          : '0.5px solid black',
				'position'        : 'relative'
			},
			'@media (max-width: 420px)': {
				'.timber-container, .timber-row, .timber-panel': {
					'display'   : 'block',
					'width'     : '100%',
					'height'    : 'auto',
					'min-height': 'auto'
				}
			},
			'.timber-resize-h'         : {
				'position': 'absolute',
				'top'             : '0px',
				'right'           : '-5px',
				'width'           : '10px',
				'height'          : '100%',
				'z-index'         : '99999',
				'background-color': 'transparent'
			},
			'timber-resize-h:hover'    : {
				'cursor': 'ew-resize'
			},
			'timber-resize-v'          : {
				'position': 'absolute',
				'bottom'          : '-5px',
				'left'            : '0px',
				'width'           : '100%',
				'height'          : '10px',
				'z-index'         : '99999',
				'background-color': 'transparent'
			},
			'timber-resize-v:hover'    : {
				'cursor': 'ns-resize'
			},
			'timber-corner'            : {
				'width'      : '0',
				'height'     : '0',
				'border-top' : '20px solid red',
				'border-left': '20px solid transparent',
				'float'      : 'right'
			},
			'timber-corner:hover'      : {
				'border-top': '20px solid white'
			}
		})
	}
};