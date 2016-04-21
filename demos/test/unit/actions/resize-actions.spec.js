import { expect } from 'chai'
import { RESIZE } from '../../../src/js/constants/action-types'
import * as actions from '../../../src/js/actions/resize-actions'

describe('resize-actions', () => {

  describe('.beginResizing', () => {

    it(`has an action type of '${RESIZE.BEGIN}'`, () => {
      const action = actions.beginResizing()
      expect(action.type).to.equal(RESIZE.BEGIN)
    })

    it(`has the panelID in the payload`, () => {
      const panelID = 'example panelID'
      const action = actions.beginResizing(panelID)
      expect(action.payload).to.eql({
        panelID
      })
    })
  })
})
