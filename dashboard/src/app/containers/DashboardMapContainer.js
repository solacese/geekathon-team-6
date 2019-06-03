//@flow

import { connect } from 'react-redux'
// import {senddataAction} from '../actions'

import DashboardMap from '../components/DashboardMap'


const mapStateToProps = state => {
  // console.log('mapStateToProps', state)
  return {
    // fieldData: state.dataReducer.fieldData,
    currentData: state.dataReducer.currentData,

  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     // distributeData: fieldData => {
//     //   // console.log('distributeData', fieldData)
//     //   dispatch(senddataAction(fieldData))
//     // }
//   }
// }


const DashboardMapContainer = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(DashboardMap)

export default DashboardMapContainer