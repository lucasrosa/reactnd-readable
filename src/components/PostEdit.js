import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'

class PostEdit extends Component {
  state = {
    title: '',
    body: '',
  }

  handleTitleChange = (e) => {
    const title = e.target.value

    this.setState(() => ({
      title
    }))
  }

  handleBodyChange = (e) => {
    const body = e.target.value

    this.setState(() => ({
      body
    }))
  }

  componentDidMount() {
    // Receiving values from the pros and setting to the local state of the component
    this.setState(() => ({
      title: this.props.post.title,
      body: this.props.post.body
    }))
  }

  render() {
    const { post} = this.props
    const { title, body } = this.state

    return (
      <div>
        <p>Editing post <b>{post.title}</b> <i>by {post.author} on {formatDate(post.timestamp)}</i></p>
        Title:
        <p>
          <input
            placeholder="Post title"
            value={title}
            onChange={this.handleTitleChange}            
          />
        </p>
        Content:
        <p>
          <textarea
            placeholder="Post content"
            value={body}
            onChange={this.handleBodyChange}
          />
        </p>
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