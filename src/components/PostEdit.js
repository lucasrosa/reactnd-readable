import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'

class PostEdit extends Component {
  render() {
    const { post} = this.props

    return (
      <div>
        <input value={post.title}></input>
          <h3 className='center'>{post.title}</h3>
          <p><i>by {post.author} on {formatDate(post.timestamp)}</i></p>
          <p>{post.body}</p>  
      </div>
    )
  }
}
function mapStateToProps ({posts}, props) {
    const id = props.match.params.id
    
    
    const post = posts[id]
    
    return {
      post: post ? post : null
    }
  }
    
  export default withRouter(connect(mapStateToProps)(PostEdit))