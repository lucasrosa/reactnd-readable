import { getInitialData } from '../utils/api'
import { receiveCategories } from '../actions/categories'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ categories }) => {
        dispatch(receiveCategories(categories))
      })
  }
}