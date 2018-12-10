import React, {Component} from 'react';


class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.changeHandle = this.changeHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room)});
      this.props.makeActiveRoom(room)
    });
  }

  createRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({ newRoomName: "" });
  }

  changeHandle(e){
    this.setState({ newRoomName: e.target.value })
  }

  submitHandle(e) {
    e.preventDefault();
    this.createRoom(this.state.newRoomName);
  }


  render() {
    return (
      <div>
          <h1>Bloc Chat</h1>
        <form onSubmit={this.submitHandle}>
          <input
            type="text"
            value={this.state.newRoomName}
            onChange={this.changeHandle}
            placeholder="create new room"
          />
          <input type="SUBMIT" />
        </form>
        <ul> 
          {this.state.rooms.map(room =>(
            <li key={room.key}>
              <button onClick={() => this.props.makeActiveRoom(room)}>
                {room.name}
              </button>
            </li>
          ))}
        </ul>  
      </div>
    );
  }
}

export default RoomList;
