//@flow

import { connect } from 'react-redux'
import {senddataAction} from '../actions'

import Dashboard from '../components/Dashboard'


const mapStateToProps = state => {
  // console.log('mapStateToProps', state)
  return {
    fieldData: state.dataReducer.fieldData,
    currentData: state.dataReducer.currentData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    distributeData: fieldData => {
      // console.log('distributeData', fieldData)
      dispatch(senddataAction(fieldData))
    }
  }
}


const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer