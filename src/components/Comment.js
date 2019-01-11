import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { handleUpvoteComment, handleDownvoteComment } from '../actions/comments'

class Comment extends Component {
    handleUpvote = (e) => {
        e.preventDefault()
        const { dispatch, comment } = this.props
        dispatch(handleUpvoteComment(comment.id))
    }

    handleDownvote = (e) => {
        e.preventDefault()
        const { dispatch, comment } = this.props
        dispatch(handleDownvoteComment(comment.id))
    }

    render() {
        const { comment } = this.props

        return (
            <div>
            <hr></hr>
            On {formatDate(comment.timestamp)} <b>{comment.author}</b> commented:
            <p>{comment.body}</p>
            Score: {comment.voteScore} &nbsp;
            <button name="upvoteComment" onClick={this.handleUpvote}>Upvote</button>
            <button name="downvoteComment" onClick={this.handleDownvote}>Downvote</button>
            <p>
            <Link to={`/comments/${comment.id}/editcomment`}>
                Edit
            </Link>
            </p>
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