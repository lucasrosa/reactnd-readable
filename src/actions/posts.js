import { voteForAPost, updatePostOnServer, deletePostOnServer, addPostOnServer } from '../utils/api'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'

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

function deletePost (id) {
  return {
    type: DELETE_POST,
    id,
  }
}

export function handleDeletePost (id) {
  return (dispatch) => {
    dispatch(deletePost(id)) 
    
    return deletePostOnServer(id, false)
      .catch((e) => {
        console.warn('Error in handleDeletePost: ', e)
        // TODO dispatch(addPost(id))
        alert('The was an error deleting the post. Try again.')
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
        console.warn('Error in handleUpdatingPost: ', e)
        dispatch(updatePost(id, title, body))
        alert('The was an error updating the post. Try again.')
      })
  }
}

function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export function handleAddPost (title, body, author, category) {
  const id =  Math.random().toString(36).substr(-8)
  const newPost = {
      id,
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    }  

  return (dispatch) => {
    dispatch(addPost( { 
      ...newPost,
      voteScore: 0,
      commentCount: 0
    })) 
    
    return addPostOnServer(newPost)
      .catch((e) => {
        console.warn('Error in handleUpdatingPost: ', e)
        dispatch(deletePost(id))
        alert('The was an error updating the post. Try again.')
      })
  }
}

