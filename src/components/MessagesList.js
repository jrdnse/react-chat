import React, { Component } from 'react';
import autoscroll from 'autoscroll-react';

const style = {
  overflowY: 'scroll',
  height: '300px'
};

class MessagesList extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul style={style}>
        {messages.map(message => (
          <li>
            <span style={{ fontWeight: 'bold' }}>{message.author}:</span> {message.message}
          </li>
        ))}
      </ul>
    );
  }
}

export default autoscroll(MessagesList, { isScrolledDownThreshold: 100 });
