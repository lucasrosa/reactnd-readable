import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleUpvoteComment, handleDownvoteComment } from '../actions/comments'

class Comment extends Component {


  render() {
    const { comment } = this.props

    return (
      <div>
        <hr></hr>
        On {formatDate(comment.timestamp)} <b>{comment.author}</b> commented:
        <p>{comment.body}</p>
        Score: {comment.voteScore} &nbsp;
        <button name="upvoteComment" onClick={this.handleUpvoteComment}>Upvote</button>
        <button name="downvoteComment" onClick={this.handleDownvoteComment}>Downvote</button>
      </div>
    )
  }
}
  
  
function mapStateToProps ({comments}, {id}) {
    const comment = comments[id]

    return {
        comment
    }
}
    
  export default connect(mapStateToProps)(Comment)