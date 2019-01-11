import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleUpvotePost, handleDownvotePost } from '../actions/posts'
import { formatDate } from '../utils/helpers'

class Post extends Component {
  handleUpvote = (e) => {
    e.preventDefault()
    const { dispatch, post } = this.props
    dispatch(handleUpvotePost(post.id))
  }

  handleDownvote = (e) => {
    e.preventDefault()
    const { dispatch, post } = this.props
    dispatch(handleDownvotePost(post.id))
  }

  render() {
    const { post } = this.props

    if (post === null) {
        return <p>This Post doesn't exist</p>
    }

    return (
      <div>
        <h4 className='center'>{post.title}</h4>
        <p>by {post.author} on {formatDate(post.timestamp)}</p>
        <p>Comments: {post.commentCount}</p>
        <p>Score: {post.voteScore}</p>
        <button name="upvote" onClick={this.handleUpvote}>Upvote</button>
        <button name="downvote" onClick={this.handleDownvote}>Downvote</button>
      </div>
    )
  }
}

function mapStateToProps ({posts}, { id }) {
    const post = posts[id]
    return {
      post: post ? post : null
    }
  }
  
  export default withRouter(connect(mapStateToProps)(Post))