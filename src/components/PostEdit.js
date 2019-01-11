import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { handleUpdatePost } from '../actions/posts'

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

  handleSubmit = (e) => {
    e.preventDefault()

    const { title, body } = this.state
    const { dispatch, post } = this.props

    dispatch(handleUpdatePost(post.id, title, body))

    this.setState(() => ({
      title: '',
      body: '',
    }))

    this.props.history.push(`/${post.category}/${post.id}`)
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
      <form onSubmit={this.handleSubmit}>
        <div>
          <p>Editing post <b>{post.title}</b> <i>by {post.author} from {formatDate(post.timestamp)}</i></p>
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
          <button
            type='submit'
            disabled={title === '' || body === ''}>
              Submit
          </button>
        </div>
      </form>
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