import { getInitialData } from '../utils/api'

export function handleInitialData () {
    //return (dispatch) => {
      //dispatch(showLoading())
      return getInitialData()
        .then(({ posts, categories }) => {
        console.log("posts: ", posts)
        console.log("categories: ", categories)
        //   dispatch(receiveUsers(users))
        //   dispatch(receiveTweets(tweets))
        //   dispatch(setAuthedUser(AUTHED_ID))
        //   dispatch(hideLoading())
        })
    //}
  }