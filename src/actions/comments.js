import { addCommentOnServer } from '../utils/api'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

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
    
    return addCommentOnServer(newComment)
      .catch((e) => {
        console.warn('Error in handleUpdatingPost: ', e)
        //dispatch(deleteComment(id))
        alert('The was an error updating the post. Try again.')
      })
  }
}