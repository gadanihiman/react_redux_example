import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postLogin } from '../actions/postActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../assets/style.css'
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menu: {
    width: 200,
  },
};

const uuidv1 = require('uuid/v1');

class UserForm extends Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    errMessage: 'Error',
    email: '',
    password: '',
    errResponse: {}
  };
  
  // function for change state when typing
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // handle submit form
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    // check validation for every input    
    let response = (email === '' || password === '')
      ? {
          errEmail : (email === '') ? 'email is required' : null,
          errPassword : (password === '') ? 'password is required' : null,
          status : 'error'
        }
      : `Company ${email} submited!`;

    // make new id from uuid package      
    let id = uuidv1();
    // create body post
    const post = {
      id, email, password,
      response
    };

    // make time for showing out the modal
    setTimeout(() => this.setState({ open: false }), 5000)
    
    // check if there's a 'status' property it will handle all each error message, 
    // otherwise it will send data
    return (post.response.hasOwnProperty('status'))
      ? this.handleError(response)
      : this.postUser(post);
  }

  // function for send body data to redux action
  postUser = postData => {
    // reset input data state
    this.setState({
      open: true,
      errMessage: postData.response,
      name: '',
      password: '',
      errResponse: {}
    })
    // post company to redux
    this.props.postLogin(postData);
  }

  // handle error message
  handleError = errResponse => {
    this.setState({errResponse})
    // show single first error message with snackbar alert
    this.handleSingleErrAlert(errResponse)
  }

  // handle single alert message and view it on snackbar alert
  handleSingleErrAlert = errMessage => {    
    errMessage = errMessage.errEmail || errMessage.errPassword || errMessage.errRevenue || errMessage.errPhone ;
    return this.setState({ open: true, errMessage });
  }

  render() {
    const { name, password, revenue, phone, vertical, horizontal, open, errMessage, errResponse } = this.state;
    return (
      <div>
        <h2 style={{ marginBottom: '5px' }}>Edit User</h2>
        <form className={styles.container} onSubmit={this.onSubmit}>
          { errResponse.errEmail &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errEmail}
            </p>}
          <TextField
            error={ errResponse.errEmail && true }
            name="email"
            autoComplete={'false'}
            id="standard-textarea"
            label="Email"
            placeholder="Insert email"
            onChange={e => this.onChange(e)}
            value={name}
            multiline
            style={{ marginTop: '0px', width: '80%' }}
            margin="normal"
          />
          <br/>
          { errResponse.errPassword &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errPassword}
            </p>}
          <TextField
            error={ errResponse.errPassword && true }
            name="password"
            autoComplete={'false'}
            id="standard-textarea"
            label="User password"
            placeholder="Insert User password"
            onChange={e => this.onChange(e)}
            value={password}
            multiline
            style={{ marginTop: '0px', width: '80%' }}
            margin="normal"
          />
          <br/>
          <Button type="submit" style={{width: '80%'}} variant="contained" color="primary">
            Submit
          </Button>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={this.handleCloseSnackbar}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id="message-id">{errMessage}</span>}
          />
        </form>
      </div>
    );
  }
}

UserForm.propTypes = {
  postLogin: PropTypes.func.isRequired
};

export default connect(null, { postLogin })(UserForm);
