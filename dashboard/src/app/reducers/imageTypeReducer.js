//@flow

import { IMAGE_TYPE_DETECTED } from '../actions/actionTypes'

const initialState = {
  imageType: 'normal',
}

export default (state:State = initialState, action:Action) => {
  console.log("dataReducer", "state=", state, "action=", action)

  switch(action.type){
    case IMAGE_TYPE_DETECTED: 
                      return { 
                          imageType: action.payload.imageType,
                      }

    default:            
                        return state
  }
}
