//@flow

import { SAMPLE_ACTION } from './actionTypes'

export const sampleAction = () => {
  console.log('sampleAction')
  return({
    type: SAMPLE_ACTION,
  })
}

let nextTodoId = 0
export const addTodo = (text:string) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter:string) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id:string) => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
