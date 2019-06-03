//@flow

import { connect } from 'react-redux'
import {sampleAction} from '../actions'

import Sample from '../components/Sample'
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
      case 'SHOW_ALL':
      default:
        return todos
    }
  }
  
  const mapStateToProps = state => {
    return {
      todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onTodoClick: id => {
        dispatch(sampleAction())
      }
    }
  }


const SampleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sample)

export default SampleContainer