import CONTAINER_FLOW from '../constants/container-flows'

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

export const tableRow = {
  display: 'table-row'
}

export const tableCell = {
  display: 'table-cell',
  position: 'relative'
}

export const panel = {
  [CONTAINER_FLOW.VERTICAL]: {
    ...tableRow,
    background: 'grey',
  },
  [CONTAINER_FLOW.HORIZONTAL]: {
    ...tableCell,
    background: 'grey',
  },
}
