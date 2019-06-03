//@flow

import { connect } from 'react-redux'
import {imageDetectedAction} from '../actions'

import Pane from '../components/Pane'


const mapStateToProps = state => {
  console.log('mapStateToProps', state)
  return {
    imageType: state.imageTypeReducer.imageType
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}


const ImagePanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pane)

export default ImagePanelContainer