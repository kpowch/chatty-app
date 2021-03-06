import React, {Component} from 'react';
import Header from './Header.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const colors = ['#913CCD', '#F15F74','#F76D3C', '#2CA8C2', '#98CB4A', '#5481E6'];

class App extends Component {
  // Sets initial state
  constructor(props) {
    super(props);
    this.state={
      userCount: 0, // number of users online
      userColor: colors[Math.floor(Math.random() * 5)], // color of username
      currentUser: {name: 'Anonymeows'}, // username
      messages: [], // array of messages
    };
  }

  // Adds message to message array
  // Note: => syntax automatically binds `this` to the function if used as a callback
  addMessage = (event) => {
    // console.log('handling key press')
    if(event.key === 'Enter'){
      const user = this.state.currentUser.name;
      const message = event.target.value; // get message string from the input field

      // send it to the server
      const newMessage = {
        type: 'postMessage',
        username: user,
        content: message,
        userColor: this.state.userColor
      };

      // regular expression to check if the message content includes an image link
      //TODO delete url from message
      var regexObj = new RegExp('http(s?):\/\/.+?\.(?:jpg|gif|png)');
      var imageLink = regexObj.exec(event.target.value);
      if (imageLink) {
        // console.log('Reg expression results:', imageLink[0]);
        newMessage.img = imageLink[0];
      }

      // sends message object to server to broadcast
      this.socket.send(JSON.stringify(newMessage));

      // clear the message input field
      event.target.value = '';
    }
  }

  // Updates the username
  updateCurrentUser = (event) => {
    const prevName = this.state.currentUser.name;
    // set username to anonymous if they don't give one
    // TODO make sure default name in chatbar also shows Anonymous
    let currentUser = event.target.value ? event.target.value : 'Anonymeows';

    const notification = `${prevName} changed their name to ${currentUser}`;

    const newUser = {
      type: 'postNotification',
      notification: notification
    }

    this.socket.send(JSON.stringify(newUser));
    this.setState({currentUser: {name: currentUser}});
  }

  // Handles received messages from server
  componentDidMount = () => {
    this.socket = new WebSocket('ws://0.0.0.0:3001');

    this.socket.onopen = () => {
      console.log('\n App connected to server');
    };

    this.socket.onmessage = (event) => {
      // console.log('Data:', event.data);
      const data = JSON.parse(event.data);

      // handles message according to what kind of info is coming out
      // TODO some of this is redundant
      switch(data.type) {
        case 'incomingMessage':
          // console.log('incomingMessage', data);
          const messages = this.state.messages.concat(data);
          this.setState({messages: messages});
          break;
        case 'incomingNotification':
          // console.log('incomingNotification', data);
          const notification = this.state.messages.concat(data);
          this.setState({messages: notification});
          break;
        case 'userCount':
          // console.log('count', data.userCount);
          this.setState({userCount: data.userCount});
          break;
        default:
          // show error in console if message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }

  render() {
    // console.log('rendering app');
    return (
      <div>
        <Header userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages} userColor={this.state.userColor}/>
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} updateCurrentUser={this.updateCurrentUser}/>
      </div>
    );
  }
}
export default App;
