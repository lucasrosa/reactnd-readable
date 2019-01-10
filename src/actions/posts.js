import { voteForAPost } from '../utils/api'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

function upvotePost (id) {
  return {
    type: UPVOTE_POST,
    id,
  }
}

function downvotePost (id) {
  return {
    type: DOWNVOTE_POST,
    id,
  }
}

export function handleUpvotePost (id) {
  return (dispatch) => {
    dispatch(upvotePost(id)) 
    
    return voteForAPost(id, true)
      .catch((e) => {
        console.warn('Error in handleUpvotePost: ', e)
        dispatch(downvotePost(id))
        alert('The was an error upvoting the post. Try again.')
      })
  }
}