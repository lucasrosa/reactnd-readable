import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { updateCurrentCategory } from '../actions/currentCategory'
import { withRouter } from 'react-router-dom'

class List extends Component {
  handleCategoryChange = (e) => {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(updateCurrentCategory(e.target.id))
    if (e.target.id === "all") {
      this.props.history.push(`/`)
    } else {
      this.props.history.push(`/${e.target.id}`)
    }
    
  }

  // componentDidMount() {
  //   const { dispatch } = this.props
  //   dispatch(updateCurrentCategory("redux"))
  // }

  render() {
    const { postsArray, currentCategory } = this.props
    let filteredPosts = postsArray

    if (currentCategory !== "all") {
      filteredPosts = postsArray.filter( post => post.category === currentCategory)
    }
    
    return (
      <div>
        <h3 className='center'>Categories</h3>
        <ul className='categories-list'>
          <li key="all">
            <div id="all" onClick={this.handleCategoryChange}>All</div>
          </li>
          {this.props.categorieArray.map((category) => (
            <li key={category.name}>
              <div id={category.name} onClick={this.handleCategoryChange}>{category.name}</div>
            </li>
          ))}
        </ul>
        <h3 className='center'>Posts</h3>
        <div className='posts-list'>
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <Post id={post.id} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ currentCategory, categories, posts }) {
  return {
    currentCategory,
    categorieArray: Object.values(categories),
    postsArray: Object.values(posts)
  }
}
export default withRouter(connect(mapStateToProps)(List))