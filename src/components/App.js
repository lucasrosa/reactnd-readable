import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import List from './List'
// import { 
//   getPostsByCategory, 
//   addPost, 
//   getPost, 
//   voteForAPost, 
//   updatePost,
//   deletePost,
//   getPostComments,
//   addComment,
//   getComment,
//   voteForAComment,
//   updateComment,
//   deleteComment
// } from '../utils/api'
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
    // handleInitialData()
    // getPostsByCategory('redux').then(({ posts }) => {
    //   console.log("posts in redux: ", posts)
    //   }
    // )

    // getPost("yt391mnn").then((post) => {
    //   console.log("post returned: ", post)
    //   }
    // )
    
    // getPostComments("yt391mnn").then((comments) => {
    //   console.log("comments returned: ", comments)
    //   }
    // )

    // getComment("wkmy50cc").then((comment) => {
    //   console.log("comment returned: ", comment)
    //   }
    // )
    
    // voteForAComment("wkmy50cc", true).then((result) => {
    //   console.log("comment upvoted: ", result)
    //   }
    // )

    // deleteComment("wkmy50cc").then((result) => {
    //   console.log("comment removed: ", result)
    //   }
    // )
    
    // updateComment("wkmy50cc", "A new body").then((result) => {
    //   console.log("Comment updated:", result)
    //   }
    // )
    
    // addComment("yt391mnn", "A nice comment.", "Joseph").then((comments) => {
    //   console.log("adding comment returned: ", comments)
    //   }
    // )

    // voteForAPost("yt391mnn", true).then((result) => {
    //   console.log("upvoted: ", result)
    //   }
    // )

    // updatePost("yt391mnn", "Hello moto", "bambinoto").then((result) => {
    //   console.log("udated: ", result)
    //   }
    // )
    // deletePost("nqbg7owv").then((result) => {
    //   console.log("removed: ", result)
    //   }
    // )



    // const post = {
    //   id: Math.random().toString(36).substr(-8),
    //   timestamp: Date.now(),
    //   title: "A post about life",
    //   body: "Life is short, don't waste it",
    //   author: "Lucas Rosa",
    //   category: "react"
    // }
    // Adding a post
    // addPost(post).then((result) => {
    //   if (!result.error) {
    //     console.log("Reult!: ", result)
          
    //   } else {
    //     console.log("Error: ", result)
    //   }
    // })


  }
  render() {
    return (
      <Router>
          <div className='container'>
              <Route path='/' exact component={List} />
              <Route path='/:category' component={List} />
          </div>
      </Router>
    );
  }
}

//<Route path='/tweet/:id' component={TweetPage} />
//<Route path='/new' component={NewTweet} />

export default connect()(App)
