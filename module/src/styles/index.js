
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
        'position'   : 'absolute',
        'right'      : '0',
        'width'      : '0',
        'height'     : '0',
        'border-top' : '20px solid red',
        'border-left': '20px solid transparent'
    },
    '.ruip-corner:hover': {
        'border-top': '20px solid white'
    },
    '.ruip-merge-from-left': {
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0,0,0,0.5)',
        '-webkit-clip-path': 'polygon(' + mergeFromLeftShape.toString() + ')',
        'clip-path': 'polygon(' + mergeFromLeftShape.toString() + ') '
    },
    '.ruip-merge-from-right': {
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0,0,0,0.5)',
        '-webkit-clip-path': 'polygon(' + mergeFromRightShape.toString() + ')',
        'clip-path': 'polygon(' + mergeFromRightShape.toString() + ') '
    },
    '.ruip-merge-from-top': {
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0,0,0,0.5)',
        '-webkit-clip-path': 'polygon(' + mergeFromTopShape.toString() + ')',
        'clip-path': 'polygon(' + mergeFromTopShape.toString() + ') '
    },
    '.ruip-merge-from-bottom': {
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'background-color': 'rgba(0,0,0,0.5)',
        '-webkit-clip-path': 'polygon(' + mergeFromBottomShape.toString() + ')',
        'clip-path': 'polygon(' + mergeFromBottomShape.toString() + ') '
    }
}

export default styles