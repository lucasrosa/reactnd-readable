import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared'
import { getPostsByCategory } from '../utils/api'
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
