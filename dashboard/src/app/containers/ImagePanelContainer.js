//@flow

import { connect } from 'react-redux'
import {imageDetectedAction} from '../actions'

import ImagePanel from '../components/ImagePanel'


const mapStateToProps = state => {
  console.log('mapStateToProps', state)
  return {
    imageType: state.imageTypeReducer.imageType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    imageDetectedAction: payload => {
      // console.log('distributeData', fieldData)
      dispatch(imageDetectedAction(payload))
    }
  }
}


const ImagePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagePanel)

export default ImagePanelContainer