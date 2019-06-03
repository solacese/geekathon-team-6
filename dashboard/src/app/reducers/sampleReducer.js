//@flow

import { SAMPLE_ACTION } from '../actions/actionTypes'

type Action = {
  type: string,
}

type State = {
  sample: string,
}
const initialState = {
  sample: '1',
}

export default (state:State = initialState, action:Action) => {
  // console.log("sampleReducer", "state=", state, "action=", action)

  switch(action.type){
    case SAMPLE_ACTION: return {sampleState: 'HELLO'}
    default:            
                        return state
  }
}
