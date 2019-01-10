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
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    categorieArray: Object.values(categories)
  }
}
export default connect(mapStateToProps)(List)