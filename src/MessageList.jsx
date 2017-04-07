import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  render() {
    // console.log('rendering messageList');
    return (
      <main className='messages'>
        {/* this should check the type and either render the notification or the message */}
        {this.props.messages.map((message) =>
          <Message message={message} key={message.id}/>
        )}
      </main>
    );
  }
}

export default MessageList;
