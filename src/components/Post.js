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
    const { post, full } = this.props

    if (post === null) {
        return <p>This Post doesn't exist</p>
    }

    return (
      <div>
        <Link to={`/${post.category}/${post.id}`}>
          <h3 className='center'>{post.title}</h3>
        </Link>
        <p><i>by {post.author} on {formatDate(post.timestamp)}</i></p>
        {full && (
          <p>{post.body}</p>  
        )}
        <p>Comments: {post.commentCount}</p>
        <p>Score: {post.voteScore}</p>
        <button name="upvote" onClick={this.handleUpvote}>Upvote</button>
        <button name="downvote" onClick={this.handleDownvote}>Downvote</button>
      </div>
    )
  }
}

function mapStateToProps ({posts}, props) {
    let {id} = props
    if (!id) {
      id = props.match.params.id
    }
    
    const post = posts[id]
    
    return {
      post: post ? post : null
    }
  }
  
  export default withRouter(connect(mapStateToProps)(Post))