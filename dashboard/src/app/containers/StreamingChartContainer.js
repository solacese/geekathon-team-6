//@flow

import { connect } from 'react-redux'

import StreamingChart from '../components/StreamingChart'


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


const StreamingChartContainer = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(StreamingChart)

export default StreamingChartContainer