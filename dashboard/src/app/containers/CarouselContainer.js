//@flow

import { connect } from 'react-redux'
import {senddataAction} from '../actions'

import Carousel from '../components/Carousel'


const mapStateToProps = state => {
  console.log("State", state)
  return {
    fieldData: state.dataReducer.fieldData,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    distributeData: fieldData => {
      dispatch(senddataAction(fieldData))
    }
  }
}


const CarouselContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Carousel)

export default CarouselContainer