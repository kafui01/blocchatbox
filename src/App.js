import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './component/RoomList';
import MessageList from './component/MessageList';
import './App.css'

var config = {
  apiKey: "AIzaSyDBjIE4hLDvsU8xEWQZCJgFnuaH8FX2wIE",
  authDomain: "chatbox-f1632.firebaseapp.com",
  databaseURL: "https://chatbox-f1632.firebaseio.com",
  projectId: "chatbox-f1632",
  storageBucket: "chatbox-f1632.appspot.com",
  messagingSenderId: "1081142940081"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {activeRoom: ''}
    this.makeActiveRoom = this.makeActiveRoom.bind(this);
  }

  makeActiveRoom(room) {
    this.setState({
      activeRoom: room
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="float-left" id="Aside"> 
          <RoomList firebase={firebase}
                    makeActiveRoom={this.makeActiveRoom}/>
        </div>
        <div className="float-right" id="Section">
          <h2>MESSAGE GOES HERE</h2>
          <MessageList firebase={firebase}  makeActiveRoom={this.state.makeActiveRoom} />
        </div>
      </div>
    );
  }
}

export default App;
