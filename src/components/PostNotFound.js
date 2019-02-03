import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostNotFound extends Component {
    render () {
        return <h5>Post not found. Go back to <Link to={`/`}>home</Link>.</h5>
    }
}

export default PostNotFound