
const mergeFromLeftShape = [
    '0% calc(50% - 25px)',      // Arrow top left
    '0% 0%',                    // Top Left
    '100% 0%',                  // Top Right
    '100% 100%',                // Bottom Right
    '0% 100%',                  // Bottom Left
    '0% calc(50% + 25px)',      // Arrow bottom left
    '40px calc(50% + 25px)',    // Arrow bottom right
    '40px calc(50% + 50px)',    // Arrow bottom corner
    '100px 50%',                // Arrow Point
    '40px calc(50% - 50px)',    // Arrow top corner
    '40px calc(50% - 25px)'     // Arrow top right
]
const mergeFromRightShape = [
    '100% calc(50% - 25px)',    // Arrow top right
    '100% 0%',                  // Top Right
    '0% 0%',                    // Top Left
    '0% 100%',                  // Bottom Left
    '100% 100%',                // Bottom Right
    '100% calc(50% + 25px)',    // Arrow bottom right
    'calc(100% - 40px) calc(50% + 25px)',    // Arrow bottom left
    'calc(100% - 40px) calc(50% + 50px)',    // Arrow bottom corner
    'calc(100% - 100px) 50%',                // Arrow Point
    'calc(100% - 40px) calc(50% - 50px)',    // Arrow top corner
    'calc(100% - 40px) calc(50% - 25px)'     // Arrow top right
]
const mergeFromTopShape = [
    'calc(50% - 25px) 0%',      // Arrow top left
    '0% 0%',                    // Top Left
    '0% 100%',                  // Bottom Left
    '100% 100%',                // Bottom Right
    '100% 0%',                  // Top Right
    'calc(50% + 25px) 0%',      // Arrow top right
    'calc(50% + 25px) 40px',    // Arrow bottom right
    'calc(50% + 50px) 40px',    // Arrow right corner
    '50% 100px',                // Arrow Point
    'calc(50% - 50px) 40px',    // Arrow left corner
    'calc(50% - 25px) 40px'     // Arrow bottom left
]
const mergeFromBottomShape = [
    'calc(50% + 25px) 100%',    // Arrow bottom right
    '100% 100%',                // Bottom Right
    '100% 0%',                  // Top Right
    '0% 0%',                    // Top Left
    '0% 100%',                  // Bottom Left
    'calc(50% - 25px) 100%',    // Arrow bottom left
    'calc(50% - 25px) calc(100% - 40px)',    // Arrow top left
    'calc(50% - 50px) calc(100% - 40px)',    // Arrow left corner
    '50% calc(100% - 100px)',                // Arrow Point
    'calc(50% + 50px) calc(100% - 40px)',    // Arrow right corner
    'calc(50% + 25px) calc(100% - 40px)'     // Arrow top right
]

const styles = {
    ".repanel": {
        'width' : '100%',
        'height': '100%'
    },
    ".repanel-container": {
        'width'       : '100%',
        'height'      : '100%',
        'min-height'  : '200px',
        'display'     : 'table'
    },
    ".repanel-row": {
        'display'      : 'table-row'
    },
    ".repanel-panel": {
        'display'         : 'table-cell',
        'background-color': 'grey',
        'position'        : 'relative'
    },
    '@media (max-width: 420px)': {
        '.repanel-container, .repanel-row, .repanel-panel': {
            'display'   : 'block',
            'width'     : '100%',
            'height'    : 'auto',
            'min-height': 'auto'
        }
    },
    '.repanel-resize-h': {
        'position'        : 'absolute',
        'top'             : '0px',
        'right'           : '-6px',
        'width'           : '12px',
        'height'          : 'calc(100% - 2px)',
        'z-index'         : '99990',
        'background-color': 'transparent'
    },
    '.repanel-resize-h > div': {
        'position'        : 'absolute',
        'left'            : '4px',
        'width'           : '4px',
        'height'          : '100%',
        'background-color': 'black'
    },
    '.repanel-resize-h:hover': {
        'cursor': 'ew-resize'
    },
    '.repanel-resize-h:hover > div': {
        'background-color': 'white'
    },
    '.repanel-resize-v': {
        'position'        : 'absolute',
        'bottom'          : '-6px',
        'left'            : '2px',
        'width'           : 'calc(100% - 2px)',
        'height'          : '12px',
        'z-index'         : '99999',
        'background-color': 'transparent'
    },
    '.repanel-resize-v > div': {
        'position'        : 'absolute',
        'top'             : '4px',
        'height'          : '4px',
        'width'           : '100%',
        'background-color': 'black'
    },
    '.repanel-resize-v:hover': {
        'cursor': 'ns-resize'
    },
    '.repanel-resize-v:hover > div': {
        'background-color': 'white'
    },
    '.repanel-corner': {
        'position'   : 'absolute',
        'right'      : '0',
        'width'      : '0',
        'height'     : '0',
        'border-top' : '20px solid red',
        'border-left': '20px solid transparent'
    },
    '.repanel-corner:hover': {
        'border-top': '20px solid white',
        'cursor': 'crosshair'
    },
    '.repanel-merge-from-left': {
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0,0,0,0.5)',
        '-webkit-clip-path': 'polygon(' + mergeFromLeftShape.toString() + ')',
        'clip-path': 'polygon(' + mergeFromLeftShape.toString() + ') '
    },
    '.repanel-merge-from-right': {
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0,0,0,0.5)',
        '-webkit-clip-path': 'polygon(' + mergeFromRightShape.toString() + ')',
        'clip-path': 'polygon(' + mergeFromRightShape.toString() + ') '
    },
    '.repanel-merge-from-top': {
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0,0,0,0.5)',
        '-webkit-clip-path': 'polygon(' + mergeFromTopShape.toString() + ')',
        'clip-path': 'polygon(' + mergeFromTopShape.toString() + ') '
    },
    '.repanel-merge-from-bottom': {
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0,0,0,0.5)',
        '-webkit-clip-path': 'polygon(' + mergeFromBottomShape.toString() + ')',
        'clip-path': 'polygon(' + mergeFromBottomShape.toString() + ') '
    },
    '.repanel-hidden': {
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'background-color': 'transparent',
    }
}

export default styles