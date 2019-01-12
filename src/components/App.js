import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import List from './List'
import Post from './Post'
import PostEdit from './PostEdit'
import PostNew from './PostNew'
import CommentEdit from './CommentEdit'

import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>      
        <div className='container'>
            <Route path='/' exact component={List} />
            <Route path='/:category' exact component={List} />
            <Route path='/posts/new' exact component={PostNew} />
            {/* This has to be a rendered component since we need the 'full' prop to be passed */}
            <Route
              path='/:category/:id' exact
              render={(props) => <Post {...props} full={true} />}
            />
            <Route path='/:category/:id/edit' exact component={PostEdit} />
            <Route path='/comments/:id/editcomment' exact component={CommentEdit} />
        </div>
      
      </Router>
    );
  }
}

export default connect()(App)
