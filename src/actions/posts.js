import { voteForAPost, updatePostOnServer } from '../utils/api'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'

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

export function handleDownvotePost (id) {
  return (dispatch) => {
    dispatch(downvotePost(id)) 
    
    return voteForAPost(id, false)
      .catch((e) => {
        console.warn('Error in handleUpvotePost: ', e)
        dispatch(upvotePost(id))
        alert('The was an error upvoting the post. Try again.')
      })
  }
}

function updatePost (id, title, body) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body
  }
}

export function handleUpdatePost (id, title, body) {
  return (dispatch) => {
    dispatch(updatePost(id, title, body)) 
    console.log("okay: ", id, title, body)
    return updatePostOnServer(id, title, body)
      .catch((e) => {
        console.warn('Error in handleUpvotePost: ', e)
        dispatch(updatePost(id, title, body))
        alert('The was an error upvoting the post. Try again.')
      })
  }
}