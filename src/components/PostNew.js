import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleAddPost } from '../actions/posts'

class PostNew extends Component {
  state = {
    title: '',
    body: '',
    category: this.props.categoriesArray[0].name,
    author: ''
  }

  handleTitleChange = (e) => {
    const title = e.target.value

    this.setState(() => ({
      title
    }))
  }

  handleCategoryChange = (e) => {
    const category = e.target.value

    this.setState(() => ({
      category
    }))
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

    const { title, body, author, category } = this.state
    const { dispatch, post } = this.props

    dispatch(handleAddPost(title, body, author, category))

    this.setState(() => ({
      title: '',
      body: '',
      category: '',
      author: ''
    }))

    this.props.history.push(`/`)
  } 

  render() {
    const { categoriesArray } = this.props
    const { title, body, author, category } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <h5><Link to={`/`}>Home</Link> > New post</h5>
        <h2>Adding a new post</h2>
        <div>
          Title:
          <p>
            <input
              placeholder="Post title"
              value={title}
              onChange={this.handleTitleChange}            
            />
          </p>
          Category:
          <p>
            <select value={category} onChange={this.handleCategoryChange}>
              {categoriesArray.map((thisCategory) => (
                <option key={thisCategory.name} value={thisCategory.name} >
                   {thisCategory.name}
                </option>
              ))}
            </select>
          </p>
          Author:
          <p>
            <input
              placeholder="Post author"
              value={author}
              onChange={this.handleAuthorChange}            
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
    
function mapStateToProps ({categories}) {
  
  return {
    categoriesArray: Object.values(categories)
  }
}
  
export default withRouter(connect(mapStateToProps)(PostNew))