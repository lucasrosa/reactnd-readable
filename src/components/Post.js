import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleUpvotePost, handleDownvotePost, handleDeletePost } from '../actions/posts'
import { receiveComments } from '../actions/comments'
import { formatDate } from '../utils/helpers'
import CommentNew from './CommentNew'
import { getPostComments } from '../utils/api'

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

  componentDidMount() {
    const { dispatch, post } = this.props

    getPostComments(post.id)
      .then((comments) => {
        dispatch(receiveComments(comments))
      })
  }

  render() {
    const { post, full, comments } = this.props
    console.log("clmmm", comments)
    
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
            <div>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <div>
                    On {formatDate(comment.timestamp)} <b>{comment.author}</b> commented:
                    <p>{comment.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    )
  }
}

function mapStateToProps ({posts, comments}, props) {
  // If the id was passed as a prop, get it
  let {id} = props
  // If the id was not passed as a prop, then it should come from the URL
  if (!id) {
    id = props.match.params.id
  }
  
  const post = posts[id]
  // Get the comments of this post from the state
  const commentsOfThisPost = Object.values(comments).filter((comment) => comment.parentId === id)

  return {
    post: post ? post : null,
    comments: commentsOfThisPost
  }
}
  
export default withRouter(connect(mapStateToProps)(Post))