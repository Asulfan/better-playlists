import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

let fakeServerData = {
  user: {
    name: 'Audun',
    playlist: [
      {
        name: 'Rap',
        songs: [
          {name: 'Rappers Delight', duration: 125},
          {name: 'Rap Saved me', duration: 122},
          {name: 'Rap God', duration: 136}
        ]
      },
      {
        name: 'Rock',
        songs: [
          {name: 'Rockers Delight', duration: 125},
          {name: 'Rock Saved me', duration: 122},
          {name: 'Rock God', duration: 136}
        ]
      },
      {
        name: 'Blues',
        songs: [
          {name: 'Rlues Delight', duration: 125},
          {name: 'Blues Saved me', duration: 122},
          {name: 'Blue God', duration: 136}
        ]
      },
      {
        name: 'Piano',
        songs: [
          {name: 'Piano Delight', duration: 125},
          {name: 'Piano Saved me', duration: 122},
          {name: 'Piano God', duration: 136}
        ]
      },
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '45%', display: 'inline-block'}} className="aggregate">
        <h2>{this.props.playlist.length} playlist</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlist.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0);

    return (
      <div style={{...defaultStyle, width: '45%', display: 'inline-block'}} className="aggregate">
        <h2>{Math.floor(totalDuration/60)} Hours</h2>
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
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
        </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s playlist
          </h1>
          <PlaylistCounter playlist={this.state.serverData.user.playlist} />
          <HoursCounter playlist={this.state.serverData.user.playlist}/>
          <Filter/>
          {this.state.serverData.user.playlist.map(playlist => 
            <Playlist playlist={playlist}/>
          )};
        </div> : <h1 style={defaultStyle}>'Loading...'</h1>
        }
      </div>
    );
  }
}

export default App;