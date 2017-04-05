import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  // set initial state
  constructor(props) {
    super(props);
    this.state={
      currentUser: {name: ''},
      messages: []
    };
    // These are not necessary because the handle functions automatically bind 'this' to them
    // this.addMessage=this.addMessage.bind(this);
    // this.updateCurrentUser=this.updateCurrentUser.bind(this);
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
      const newMessage = {username: user, content: message};
      this.socket.send(JSON.stringify(newMessage));

      // clear the message input field
      event.target.value = '';
    }
  }

  // updates the username
  updateCurrentUser = (event) => {
    this.setState({currentUser: {name: event.target.value}});
  }


  componentDidMount = () => {
    this.socket = new WebSocket('ws://0.0.0.0:3001');

    this.socket.onopen = function () {
      console.log('\n App connected to server');
    };

    this.socket.onmessage = (messageEvent) => {
      console.log('Message data:', messageEvent.data)

      // adds new message to message array and sends to browswer to render
      const messages = this.state.messages.concat(JSON.parse(messageEvent.data));
      this.setState({messages: messages});
    };

  }

  render() {
    // console.log('rendering app');
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage} updateCurrentUser={this.updateCurrentUser}/>
      </div>
    );
  }
}
export default App;
