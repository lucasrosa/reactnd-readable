import { RECEIVE_COMMENTS, ADD_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT, DELETE_COMMENT } from '../actions/comments'

export default function comments (state = {}, action) {
  switch(action.type) {
    case RECEIVE_COMMENTS :
      return {
        ...state,
        ...action.comments
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    case UPVOTE_COMMENT :
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          voteScore: state[action.id].voteScore + 1
        }     
    }
    case DOWNVOTE_COMMENT :
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          voteScore: state[action.id].voteScore - 1
        }
    }  
    case DELETE_COMMENT :
      const {[action.id]:id, ...newState} = state
      return newState
      
    default :
      return state
  }
}