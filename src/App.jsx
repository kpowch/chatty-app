import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  // set initial state
  constructor(props) {
    super(props);
    this.state={
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.handleKeyPress=this.handleKeyPress.bind(this);
    this.updateCurrentUser=this.updateCurrentUser.bind(this);
  }

  handleKeyPress = (event) => {
    console.log('handling key press')
    if(event.key === 'Enter'){
      const nextIndex = this.state.messages.length + 1; // increments id for next message
      const user = this.state.currentUser.name;
      const message = event.target.value; // gets message from message input

      // update the state of the app component
      const newMessage = {id: nextIndex, username: user, content: message};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});

      event.target.value = ''; // clears the message input field
    }
  }

  updateCurrentUser = (event) => {
    this.setState({currentUser: {name: event.target.value}});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 1000);
  }

  render() {
    console.log('rendering app');
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} handleNewMessage={this.handleKeyPress} leave={this.updateCurrentUser}/>
      </div>
    );
  }
}
export default App;
