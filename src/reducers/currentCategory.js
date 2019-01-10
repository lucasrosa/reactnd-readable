import { UPDATE_CURRENT_CATEGORY } from '../actions/currentCategory'

export default function currentCategory (state = {}, action) {
  switch(action.type) {
    case UPDATE_CURRENT_CATEGORY :
      state = action.currentCategory
      return state
    default :
      return state
  }
}