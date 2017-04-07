//TODO make it so that the notification doesn't take up 2 lines
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
          <img className='message-image' src={this.props.message.img}/>
        </div>
      </div>
    );
  }
}

export default Message;
