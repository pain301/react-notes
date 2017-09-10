import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CommentApp from './CommentApp';
import './index.css';

class Admin extends Component {

  render () {
    const username = 'pain'
    return (
      <div>
        <h1>Hello{username ? `, ${username}` : null}</h1>
      </div>
    )
  }
}

ReactDOM.render(
  //<CommentApp />,
  <Admin />,
  document.getElementById('root')
);
