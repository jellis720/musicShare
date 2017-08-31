import React, { Component } from 'react';

export default class PlayListForm extends Component {

  constructor(props) {
  super(props);

  this.handleUserName = this.handleUserName.bind(this);
  this.handleSongArtist= this.handleSongArtist.bind(this);
  this.handleSongTitle = this.handleSongTitle.bind(this);
  this.handleSongNotes = this.handleSongNotes.bind(this);

  this.state = {
    userName: '',
    songArtist: '',
    songTitle: '',
    songNotes: ''
  }
}

handleUserName(e) {
  this.setState({userName: e.target.value});
}
handleSongArtist(e) {
  this.setState({songArtist: e.target.value});
}
handleSongTitle(e) {
  this.setState({songTitle: e.target.value});
}
handleSongNotes(e) {
  this.setState({songNotes: e.target.value});
}

  addToList = (e) => {
      e.preventDefault();
      this.setState({userName: e.target.value, songTitle: e.target.value, songArtist: e.target.value, songNotes: e.target.value});
      let listItem = JSON.stringify(this.state);

      fetch("https://tiny-lasagna-server.herokuapp.com/collections/playlisting", {
        method: "POST",
        body: listItem,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    }
    ).then(response => {
      console.log(response, "yes");

    }).catch(err => {
      console.log(err, "you lose");
    });
    this.setState({userName: '', songNotes: '', songArtist: '', songTitle:''});
  }

  componentDidMount() {
  fetch('https://tiny-lasagna-server.herokuapp.com/collections/playlisting').then(results => {
        return results.json();
      }).then(data => {
        this.setState({songs: data});
        console.log("state", this.state.songs);
      })
}

  render() {
    return (
      <form className="col-md-7">
        <div className="form-group">
          <label htmlFor="userName">User Name: </label>
          <input
            type="text"
            name="userName"
            onChange={this.handleUserName}
            value={this.state.userName}
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div>
          <label htmlFor="songArtist">Artist/Band: </label>
          <input
            type="text"
            name="songArtist"
            onChange={this.handleSongArtist}
            value={this.state.songArtist}
            className="form-control"
            placeholder="Artist"
          />
        </div>
        <div className="form-group">
          <label htmlFor="songTitle">Song Title: </label>
          <input
            type="text"
            name="songTitle"
            onChange={this.handleSongTitle}
            value={this.state.songTitle}
            className="form-control"
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="songNotes">Notes about Song: </label>
          <input
            type="text"
            name="songNotes"
            onChange={this.handleSongNotes}
            value={this.state.songNotes}
            className="form-control"
            placeholder="Tell us what you think!"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn submit-btn form-control" onClick={this.addToList} >
            Add Your Song!
          </button>
        </div>
      </form>
    );
  }
}
