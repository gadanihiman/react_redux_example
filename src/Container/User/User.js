import React, { Component } from 'react';
import ListUsers from '../../components/ListUsers';
import { withRouter } from 'react-router-dom';


class User extends Component {
  state = {
    open: false
  }
  componentWillMount() {
    const listUsers = localStorage.getItem('Users');
    if(!listUsers){
      this.props.history.push('/')
    }
  }
  render() {
    const {open} = this.state;
    return (
      <div style={{margin: 100}}>
        <ListUsers />
      </div>
    );
  }
}

export default withRouter(User);
