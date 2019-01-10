export const UPDATE_CURRENT_CATEGORY = 'UPDATE_CURRENT_CATEGORY'

export function updateCurrentCategory (category) {
  return {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: category,
  }
}