import { getInitialData } from '../utils/api'
import { receiveCategories } from '../actions/categories'
import { receivePosts } from '../actions/posts'
import { updateCurrentCategory } from '../actions/currentCategory'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(updateCurrentCategory("all"))
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
      })
  }
}