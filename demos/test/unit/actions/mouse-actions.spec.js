import { expect } from 'chai'
import { MOUSE } from '../../../src/js/constants/action-types'
import * as actions from '../../../src/js/actions/mouse-actions'

describe('mouse-actions', () => {

  describe('.releaseLeftMouseButton', () => {

    it(`has an action type of '${MOUSE.LEFT_BUTTON_RELEASED}'`, () => {
      const action = actions.releaseLeftMouseButton()
      expect(action.type).to.equal(MOUSE.LEFT_BUTTON_RELEASED)
    })

    it(`has isLeftDown equal to false in the payload`, () => {
      const action = actions.releaseLeftMouseButton()
      expect(action.payload).to.eql({
        isLeftDown: false
      })
    })
  })
})
