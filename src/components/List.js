import React, { Component } from 'react'
import { connect } from 'react-redux'

class List extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Categories</h3>
        <ul className='categories-list'>
          {this.props.categorieArray.map((category) => (
            <li key={category.name}>
              <div id={category.name}>{category.name}</div>
            </li>
          ))}
        </ul>
        <h3 className='center'>Posts</h3>
        <ul className='posts-list'>
          {this.props.postsArray.map((post) => (
            <li key={post.id}>
              <div id={post.id}>{post.title}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categorieArray: Object.values(categories),
    postsArray: Object.values(posts)
  }
}
export default connect(mapStateToProps)(List)