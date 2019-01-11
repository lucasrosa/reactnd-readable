import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleUpvotePost, handleDownvotePost, handleDeletePost } from '../actions/posts'
import { handleAddComment } from '../actions/comments'
import { formatDate } from '../utils/helpers'
import CommentNew from './CommentNew'

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

  handleDelete = (e) => {
    e.preventDefault()
    const { dispatch, post } = this.props
    dispatch(handleDeletePost(post.id))

    this.props.history.push(`/`)
  }

  // handleNewComment = (body, author) => {
  //   const { dispatch, post } = this.props

  //   dispatch(handleAddComment(post.id, body, author))
  // }

  render() {
    const { post, full } = this.props
    
    if (post === null) {
        return <p></p>
    }

    return (
      <div>
        {full && (
          <h5><Link to={`/`}>Home</Link> > Post</h5>
        )}
        <Link to={`/${post.category}/${post.id}`}>
          <h3 className='center'>{post.title}</h3>
        </Link>
        <p><i>by {post.author} on {formatDate(post.timestamp)}</i></p>
        {full && (
          <p>{post.body}</p>  
        )}
        <p>Comments: {post.commentCount}</p>
        <p>
          Score: {post.voteScore} &nbsp;
          <button name="upvote" onClick={this.handleUpvote}>Upvote</button>
          <button name="downvote" onClick={this.handleDownvote}>Downvote</button>
        </p>
        <p>
          <Link to={`/${post.category}/${post.id}/edit`}>
            Edit
          </Link>
        </p>
        <p>
          <button name="delete" onClick={this.handleDelete}>Delete</button>
        </p>
        {full && (
          <div>
            <CommentNew postId={post.id} />
          </div>
        )}

      </div>
    )
  }
}

function mapStateToProps ({posts}, props) {
  // If the id was passed as a prop, get it
  let {id} = props
  // If the id was not passed as a prop, then it should come from the URL
  if (!id) {
    id = props.match.params.id
  }
  
  const post = posts[id]
  
  return {
    post: post ? post : null
  }
}
  
export default withRouter(connect(mapStateToProps)(Post))