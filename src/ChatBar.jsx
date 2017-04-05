import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering chatbar');
    return (
      <footer className='chatbar' onKeyPress={this.props.handleNewMessage}>
        <input className="chatbar-username" placeholder='Enter name....' defaultValue={this.props.currentUser} onBlur={this.props.leave}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;
