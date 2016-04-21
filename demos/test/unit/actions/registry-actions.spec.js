import { expect } from 'chai'
import { REGISTER } from '../../../src/js/constants/action-types'
import * as actions from '../../../src/js/actions/registry-actions'

describe('registry-actions', () => {

  describe('.registerContainer', () => {

    it(`has an action type of '${REGISTER.CONTAINER}'`, () => {
      const action = actions.registerContainer()
      expect(action.type).to.equal(REGISTER.CONTAINER)
    })

    it(`has the action creator argument as its payload`, () => {
      const payload = 'example payload'
      const action = actions.registerContainer(payload)
      expect(action.payload).to.equal(payload)
    })
  })

  describe('.registerPanel', () => {

    it(`has an action type of '${REGISTER.PANEL}'`, () => {
      const action = actions.registerPanel()
      expect(action.type).to.equal(REGISTER.PANEL)
    })

    it(`has the action creator argument as its payload`, () => {
      const payload = 'example payload'
      const action = actions.registerPanel(payload)
      expect(action.payload).to.equal(payload)
    })
  })
})
