import { 
  addCommentOnServer, 
  voteForAComment, 
  updateCommentOnServer, 
  deleteCommentOnServer
} from '../utils/api'

import {
  increaseCommentCountOfPost,
  decreaseCommentCountOfPost
} from './posts'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function handleAddComment (parentId, body, author) {
  const id =  Math.random().toString(36).substr(-8)
  const newComment = {
      id,
      timestamp: Date.now(),
      body,
      author,
      parentId
    }  

  return (dispatch) => {
    // Adding voteScore and commentCount to the local state because these are created by the server
    dispatch(addComment( { 
      ...newComment,
      voteScore: 0
    })) 
    dispatch(increaseCommentCountOfPost(parentId))
    
    return addCommentOnServer(newComment)
      .catch((e) => {
        console.warn('Error in handleUpdatingComment: ', e)
        dispatch(decreaseCommentCountOfPost(parentId))
        //dispatch(deleteComment(id))
        alert('The was an error updating the comment. Try again.')
      })
  }
}


function upvoteComment (id) {
  return {
    type: UPVOTE_COMMENT,
    id,
  }
}

function downvoteComment (id) {
  return {
    type: DOWNVOTE_COMMENT,
    id,
  }
}

export function handleUpvoteComment (id) {
  return (dispatch) => {
    dispatch(upvoteComment(id)) 
    
    return voteForAComment(id, true)
      .catch((e) => {
        console.warn('Error in handleUpvoteComment: ', e)
        dispatch(downvoteComment(id))
        alert('The was an error upvoting the comment. Try again.')
      })
  }
}

export function handleDownvoteComment (id) {
  return (dispatch) => {
    dispatch(downvoteComment(id)) 
    
    return voteForAComment(id, false)
      .catch((e) => {
        console.warn('Error in handleDownvoteComment: ', e)
        dispatch(upvoteComment(id))
        alert('The was an error upvoting the comment. Try again.')
      })
  }
}

function updateComment (id, body, timestamp) {
  return {
    type: UPDATE_COMMENT,
    id,
    timestamp,
    body
  }
}

export function handleUpdateComment (id, body) {
  return (dispatch) => {
    const timestamp = Date.now()

    dispatch(updateComment(id, body, timestamp)) 
    
    return updateCommentOnServer(id, body, timestamp)
      .catch((e) => {
        console.warn('Error in handleUpdatingComment: ', e)
        dispatch(updateComment(id, body))
        alert('The was an error updating the comment. Try again.')
      })
  }
}

function deleteComment (id) {
  return {
    type: DELETE_COMMENT,
    id,
  }
}

export function handleDeleteComment (id) {
  return (dispatch) => {
    dispatch(deleteComment(id)) 
    //dispatch(increaseCommentCountOfPost(parentId))?
    return deleteCommentOnServer(id)
      .catch((e) => {
        console.warn('Error in handleDeleteComment: ', e)
        // TODO dispatch(addPost(id))
        alert('The was an error deleting the comment. Try again.')
      })
  }
}