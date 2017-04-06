import React, {Component} from 'react';

class Message extends React.Component {
  render() {
    // console.log('rendering message');
    return (
      <div>
        <span className='message system'>
          {this.props.message.notification}
        </span>

        <div className='message'>
          <span className='message-username' style={{color:this.props.message.userColor}}>{this.props.message.username}</span>
          <span className='message-content'>{this.props.message.content}</span>
        </div>
      </div>

    );
  }
}

export default Message;
