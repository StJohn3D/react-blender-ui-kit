export const root = {
  width: '100%',
  height: '100%'
}

export const table = {
  display: 'table',
  width: '100%',
  height: '100%'
}

export const container = {
  ...table,
  minHeight: '200px'
}

export const tableCell = {
  display: 'table-cell',
  position: 'relative'
}

export const panel = {
  ...tableCell,
  background: 'grey'
}

export const resizeEW = {
  ...tableCell,
  width: '4px',
  background: '#333'
}
