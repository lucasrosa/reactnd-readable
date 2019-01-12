import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { updateCurrentCategory } from '../actions/currentCategory'
import { Link, withRouter } from 'react-router-dom'

class List extends Component {
  state = {
    orderBy: 'date'
  }

  handleSortChange = (e) => {
    const orderBy = e.target.value
    this.setState(() => ({
      orderBy
    }))
  }

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

  render() {
    const { postsArray, currentCategory } = this.props
    const { orderBy } = this.state

    let filteredPosts = postsArray

    if (currentCategory !== "all") {
      filteredPosts = postsArray.filter( post => post.category === currentCategory)
    }
    
      
    if (orderBy === "score") {
      filteredPosts = filteredPosts.sort((a,b) => b.voteScore - a.voteScore)
    } else {
      filteredPosts = filteredPosts.sort((a,b) => b.timestamp - a.timestamp)
    }
    
    return (
      <div>
        <h3 className='center'>Categories</h3>
        <ul className='categories-list'>
          <li key="all">
            <div id="all" onClick={this.handleCategoryChange} className={currentCategory === "all"?"bold":""}>All</div>
          </li>
          {this.props.categorieArray.map((category) => (
            <li key={category.name}>
              <div 
                id={category.name} 
                className={currentCategory === category.name?"bold":""}
                onClick={this.handleCategoryChange}>
                {category.name}
              </div>
            </li>
          ))}
        </ul>
        <h3 className='center'>Posts</h3>
        <div>
          <p>
            <Link to={`/posts/new`}>
              Add new post
            </Link>
          </p>
          <p>
            Order by: &nbsp;
            <select onChange={this.handleSortChange}>
              <option value="date">Date</option>
              <option value="score">Score</option>
            </select>
          </p>
        </div>
        <div className='posts-list'>
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <Post id={post.id} full={false} />
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