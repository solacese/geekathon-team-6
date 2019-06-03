//@flow

import { SEND_DATA } from '../actions/actionTypes'

type Action = {
  type: string,
}

type State = {
  sample: string,
  fieldData: Array<mixed>,
  currentData: mixed,
}
const initialState = {
  sample: '1',
  fieldData: [],
  currentData: null,
}

export default (state:State = initialState, action:Action) => {
  // console.log("dataReducer", "state=", state, "action=", action)
  let ELEMENT_COUNT = 3



  switch(action.type){
    case SEND_DATA: let newdata = Array.from(state.fieldData)
                    // console.log("before", newdata, action)

                    if (newdata.length === ELEMENT_COUNT){
                      newdata.shift()
                      // console.log('first element shifted out')
                    }
                    newdata.push(action.fieldData)
                    // console.log("after", newdata)

                    // console.log("newdata", newdata)
                      return { 
                          fieldData: newdata,
                          currentData: action.fieldData,
                      }
    default:            
                        return state
  }
}
