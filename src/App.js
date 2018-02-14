import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor
};

class Aggregate extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '45%', display: 'inline-block'}} className="aggregate">
        <h2>Number Text GIT WTF</h2>      
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={{defaultStyle}}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3 >Playlist Name</h3>
        <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
        </div>
    );
  }
}

class App extends Component {
  render() {

    return (
      <div className="App">
        <h1 style={{color: defaultTextColor}}>Title</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
