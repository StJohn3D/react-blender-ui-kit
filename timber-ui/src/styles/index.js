
const styles = {
    '.timber-ui': {
        'width' : '100%',
        'height': '100%'
    },
    '.timber-container': {
        'width'       : '100%',
        'height'      : '100%',
        'min-height'  : '200px',
        'display'     : 'table'
    },
    '.timber-row': {
        'display'      : 'table-row'
    },
    '.timber-panel': {
        'display'         : 'table-cell',
        'background-color': 'grey',
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
    '.timber-resize-h': {
        'position'        : 'absolute',
        'top'             : '0px',
        'right'           : '-6px',
        'width'           : '12px',
        'height'          : 'calc(100% - 2px)',
        'z-index'         : '99990',
        'background-color': 'transparent'
    },
    '.timber-resize-h > div': {
        'position'        : 'absolute',
        'left'            : '4px',
        'width'           : '4px',
        'height'          : '100%',
        'background-color': 'black'
    },
    '.timber-resize-h:hover': {
        'cursor': 'ew-resize'
    },
    '.timber-resize-h:hover > div': {
        'background-color': 'white'
    },
    '.timber-resize-v': {
        'position'        : 'absolute',
        'bottom'          : '-6px',
        'left'            : '2px',
        'width'           : 'calc(100% - 2px)',
        'height'          : '12px',
        'z-index'         : '99999',
        'background-color': 'transparent'
    },
    '.timber-resize-v > div': {
        'position'        : 'absolute',
        'top'             : '4px',
        'height'          : '4px',
        'width'           : '100%',
        'background-color': 'black'
    },
    '.timber-resize-v:hover': {
        'cursor': 'ns-resize'
    },
    '.timber-resize-v:hover > div': {
        'background-color': 'white'
    },
    '.timber-corner': {
        'width'      : '0',
        'height'     : '0',
        'border-top' : '20px solid red',
        'border-left': '20px solid transparent',
        'float'      : 'right'
    },
    '.timber-corner:hover': {
        'border-top': '20px solid white'
    }
}

export default styles