import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared'
import { 
  getPostsByCategory, 
  addPost, 
  getPost, 
  voteForAPost, 
  updatePost
} from '../utils/api'
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  componentDidMount() {
    //this.props.dispatch(handleInitialData())
    handleInitialData()
    getPostsByCategory('redux').then(({ posts }) => {
      console.log("posts in redux: ", posts)
      }
    )

    getPost("yt391mnn").then((post) => {
      console.log("post returned: ", post)
      }
    )

    // voteForAPost("yt391mnn", true).then((result) => {
    //   console.log("upvoted: ", result)
    //   }
    // )

    updatePost("yt391mnn", "Hello moto", "bambinoto").then((result) => {
      console.log("udated: ", result)
      }
    )


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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
