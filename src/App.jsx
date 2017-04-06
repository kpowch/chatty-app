import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  // set initial state
  constructor(props) {
    super(props);
    this.state={
      currentUser: {name: 'Anonymous'},
      messages: [],
    };
  }

  // adds message to message array
  // Note: => syntax automatically binds `this` to the function if used as a callback
  addMessage = (event) => {
    // console.log('handling key press')
    if(event.key === 'Enter'){
      // sets user and message from the input
      const user = this.state.currentUser.name;
      const message = event.target.value;

      // send it to the server
      const newMessage = {type: 'postMessage', username: user, content: message};
      this.socket.send(JSON.stringify(newMessage));

      // clear the message input field
      event.target.value = '';
    }
  }

  // updates the username
  updateCurrentUser = (event) => {
    const prevName = this.state.currentUser.name;
    const currentUser = event.target.value;
    const notification = `${prevName} has changed their name to ${currentUser}`;
    const newUser = {type: 'postNotification', notification: notification}
    this.socket.send(JSON.stringify(newUser));
    this.setState({currentUser: {name: currentUser}});
  }


  componentDidMount = () => {
    this.socket = new WebSocket('ws://0.0.0.0:3001');

    this.socket.onopen = () => {
      console.log('\n App connected to server');
    };

    this.socket.onmessage = (event) => {
      console.log('Data:', event.data);
      const data = JSON.parse(event.data);

      switch(data.type) {
        case 'incomingMessage':
          console.log('incomingMessage', data);
          const messages = this.state.messages.concat(data);
          this.setState({messages: messages});
          break;
        case 'incomingNotification':
          console.log('incomingNotification', data);
          // console.log('content', data.content);
          // this.state.notification = data.content;
          const notification = this.state.messages.concat(data);
          this.setState({messages: notification});
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
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} updateCurrentUser={this.updateCurrentUser}/>
      </div>
    );
  }
}
export default App;
