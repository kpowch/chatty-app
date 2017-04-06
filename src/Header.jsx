import React, {Component} from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('rendering header');
    return (
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>Chatty</a>
        <span className='navbar-users'>{this.props.userCount} users online</span>
      </nav>
    );
  }
}

export default Header;
