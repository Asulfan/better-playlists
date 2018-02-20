import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';

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
      <div style={defaultStyle}>
        <img/>
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)} />
      </div>
    );
  }
}

class Playlist extends Component {

  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img src={playlist.imageUrl} style={{width: '160px'}} />
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
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
          playlists: data.items.map(item => ({
            name: item.name,
            imageUrl: item.images[0].url,
            songs: []
         }))
    }))
  }

  render() {
    let playlistToRender = this.state.user && this.state.playlists ? 
    this.state.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase()))
      : []
    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.user.name}'s playlist
          </h1>
          <PlaylistCounter playlist={playlistToRender} />
          <HoursCounter playlist={playlistToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistToRender.map(playlist => 
            <Playlist playlist={playlist}/>
          )};
        </div> : <button onClick={() => window.location='http://localhost:8888/login' }
        style={{padding: '20px', 'font-size:':'50px','margin-top':'20px'}}>Sign in with Spotify.</button>
        }
      </div>
    );
  }
}

export default App;