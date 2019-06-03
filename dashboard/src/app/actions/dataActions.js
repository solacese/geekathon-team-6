//@flow

import { SEND_DATA, IMAGE_TYPE_DETECTED } from './actionTypes'

export const senddataAction = (fieldData) => {
  // console.log('senddataAction',fieldData)
  // console.log(fieldData)

  return({
    type: SEND_DATA,
    fieldData,
  })
}

export const imageDetectedAction = (payload) => {
  console.log('imageDetectedAction',payload)

  return({
    type: IMAGE_TYPE_DETECTED,
    payload,
  })
}
