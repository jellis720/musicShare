import React, { Component } from 'react';

export default class PlayListItem extends Component {
  render() {
      let cards = this.props.songs.map( song => {
        return (
              <ul className="card songCard" key={song._id}>
                <li>
                  <span className="cardGroup">User:</span> {song.userName}
                </li>
                <li>
                  <span className="cardGroup">Artist/Band:</span> {song.songArtist}
                </li>
                <li>
                  <span className="cardGroup">Title:</span> {song.songTitle}
                </li>
                <li>
                  <span className="cardGroup">Notes:</span> {song.songNotes}
                </li>
              </ul>
            );
          });
          return (
            <div className="cards">
              {cards}
            </div>
          );
      }
  }
