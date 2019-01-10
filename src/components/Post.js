import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Post extends Component {
  render() {
    const { post } = this.props

    if (post === null) {
        return <p>This Post doesn't exist</p>
    }

    return (
      <div>
        <h4 className='center'>{post.title}</h4>
        <p>by {post.author}</p>
        <p>Comments: {post.commentCount}</p>
        <p>Score: {post.voteScore}</p>
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