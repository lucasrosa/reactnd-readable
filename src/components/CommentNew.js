import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment } from '../actions/comments'

class CommentNew extends Component {
  state = {
    body: '',
    author: ''
  }

  handleAuthorChange = (e) => {
    const author = e.target.value

    this.setState(() => ({
      author
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
    
    const { body, author } = this.state
    const { dispatch, postId } = this.props

    console.log("postid", postId)
    dispatch(handleAddComment(postId, body, author))

    this.setState(() => ({
      body: '',
      author: ''
    }))
  } 

  render() {
    const { body, author } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="comment">
          New comment
          <p>
            <textarea
              placeholder="Comment content"
              value={body}
              onChange={this.handleBodyChange}
            />
          </p>
          <p>
          Author: &nbsp;
            <input
              placeholder="Comment author"
              value={author}
              onChange={this.handleAuthorChange}            
            />
             &nbsp;
            <button
            type='submit'
            disabled={author === '' || body === ''}>
              Send
          </button>
          </p>
          
        </div>
      </form>
    )
  }
}
    
function mapStateToProps ({categories}) {
  
  return {
    categoriesArray: Object.values(categories)
  }
}
  
export default connect()(CommentNew)