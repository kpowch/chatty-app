import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('rendering chatbar');
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Enter name....' defaultValue={this.props.currentUser} onBlur={this.props.updateCurrentUser}/>
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyPress={this.props.addMessage}/>
      </footer>
    );
  }
}

export default ChatBar;
