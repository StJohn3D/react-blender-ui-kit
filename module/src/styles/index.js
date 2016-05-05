
const styles = {
    ".redux-ui-panels": {
        'width' : '100%',
        'height': '100%'
    },
    ".ruip-container": {
        'width'       : '100%',
        'height'      : '100%',
        'min-height'  : '200px',
        'display'     : 'table'
    },
    ".ruip-row": {
        'display'      : 'table-row'
    },
    ".ruip-panel": {
        'display'         : 'table-cell',
        'background-color': 'grey',
        'position'        : 'relative'
    },
    '@media (max-width: 420px)': {
        '.ruip-container, .ruip-row, .ruip-panel': {
            'display'   : 'block',
            'width'     : '100%',
            'height'    : 'auto',
            'min-height': 'auto'
        }
    },
    '.ruip-resize-h': {
        'position'        : 'absolute',
        'top'             : '0px',
        'right'           : '-6px',
        'width'           : '12px',
        'height'          : 'calc(100% - 2px)',
        'z-index'         : '99990',
        'background-color': 'transparent'
    },
    '.ruip-resize-h > div': {
        'position'        : 'absolute',
        'left'            : '4px',
        'width'           : '4px',
        'height'          : '100%',
        'background-color': 'black'
    },
    '.ruip-resize-h:hover': {
        'cursor': 'ew-resize'
    },
    '.ruip-resize-h:hover > div': {
        'background-color': 'white'
    },
    '.ruip-resize-v': {
        'position'        : 'absolute',
        'bottom'          : '-6px',
        'left'            : '2px',
        'width'           : 'calc(100% - 2px)',
        'height'          : '12px',
        'z-index'         : '99999',
        'background-color': 'transparent'
    },
    '.ruip-resize-v > div': {
        'position'        : 'absolute',
        'top'             : '4px',
        'height'          : '4px',
        'width'           : '100%',
        'background-color': 'black'
    },
    '.ruip-resize-v:hover': {
        'cursor': 'ns-resize'
    },
    '.ruip-resize-v:hover > div': {
        'background-color': 'white'
    },
    '.ruip-corner': {
        'width'      : '0',
        'height'     : '0',
        'border-top' : '20px solid red',
        'border-left': '20px solid transparent',
        'float'      : 'right'
    },
    '.ruip-corner:hover': {
        'border-top': '20px solid white'
    }
}

export default styles