import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { handleUpdateComment } from '../actions/comments'

class CommentEdit extends Component {
  state = {
    body: '',
  }

  handleBodyChange = (e) => {
    const body = e.target.value

    this.setState(() => ({
      body
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { body } = this.state
    console.log("bode", body)
    const { dispatch, comment } = this.props

    dispatch(handleUpdateComment(comment.id, body))

    this.setState(() => ({
      body: '',
    }))

    this.props.history.goBack()
  }

  componentDidMount() {
    // Receiving values from the pros and setting to the local state of the component
    this.setState(() => ({
      body: this.props.comment.body
    }))
  }
  

  render() {
    const { comment } = this.props
    const { body } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <p>Editing comment <i>by {comment.author} from {formatDate(comment.timestamp)}</i></p>
          Content:
          <p>
            <textarea
              placeholder="Comment content"
              value={body}
              onChange={this.handleBodyChange}
            />
          </p>
          <button
            type='submit'
            disabled={ body === ''}>
              Submit
          </button>
        </div>
      </form>
    )
  }
}
function mapStateToProps ({comments}, props) {
    const id = props.match.params.id
    const postId = props.match.params.postId

    const comment = comments[id]
    
    return {
        comment: comment ? comment : null,
        postId
    }
  }
    
  export default withRouter(connect(mapStateToProps)(CommentEdit))