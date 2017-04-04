import React, {Component} from 'react';

class ChatBar extends React.Component {
  render() {
    // console.log('in chatbar');
    return (
      <footer className='chatbar'>
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );

  }
}

export default ChatBar;
