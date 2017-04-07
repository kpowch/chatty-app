import React, {Component} from 'react';

class Message extends React.Component {

  // Renders notification
  renderNotification() {
    const { message } = this.props;

    return (
      <span className='message system'>
        {message.notification}
      </span>
    )
  }

  // Renders message and image if one is given
  renderMessage() {
    const { message } = this.props;

    return (
      <div className='message'>
        <span className='message-username' style={{ color: message.userColor }}>
          {message.username}
        </span>
        <span className='message-content'>{message.content}</span>
      </div>
    )
  }

  render() {
    // console.log('rendering message');
    const { message } = this.props;

    return (
      <div>
        <div className='message-details'>
          {message.type === 'incomingNotification' && this.renderNotification()}
          {message.type === 'incomingMessage' && this.renderMessage()}
        </div>
        {message.img && (
          <div className='message'>
            <span className='message-username'></span>
            <div className='message-content'>
              <img  src={message.img}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Message;
