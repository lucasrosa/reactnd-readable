import { 
  RECEIVE_POSTS, 
  UPVOTE_POST, 
  DOWNVOTE_POST, 
  UPDATE_POST, 
  DELETE_POST, 
  ADD_POST, 
  INCREASE_COMMENT_COUNT_OF_POST,
  DECREASE_COMMENT_COUNT_OF_POST
} from '../actions/posts'

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        ...action.posts
      }
    case UPVOTE_POST :
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          voteScore: state[action.id].voteScore + 1
        }     
    }
    case DOWNVOTE_POST :
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          voteScore: state[action.id].voteScore - 1
        }
    }
    case UPDATE_POST :
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          title: action.title,
          body: action.body
        }
    }
    case DELETE_POST :
      const {[action.id]:id, ...newState} = state
      return newState
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }    
    case INCREASE_COMMENT_COUNT_OF_POST :
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          commentCount: state[action.id].commentCount + 1
        }
      }
    case DECREASE_COMMENT_COUNT_OF_POST :
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          commentCount: state[action.id].commentCount - 1
        }
      }  
    default :
      return state
  }
}