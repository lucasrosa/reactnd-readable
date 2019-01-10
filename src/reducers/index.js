import { combineReducers } from 'redux'
import currentCategory from './currentCategory'
import categories from './categories'
import posts from './posts'
import comments from './comments'

export default combineReducers({
  currentCategory,
  categories,
  posts,
  comments
})