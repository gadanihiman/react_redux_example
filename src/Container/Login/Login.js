import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postLogin } from '../../actions/postActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../../assets/style.css'
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

class LoginForm extends Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    errMessage: 'Error',
    email: '',
    password: '',
    errResponse: {},
    submitRes: {},
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
          errEmail : (email === '') ? 'Email is required' : null,
          errPassword : (password === '') ? 'password is required' : null,
          status : 'error'
        }
      : `You are signed in!`;

    // create body post
    const post = { email, password, response };

    // make time for showing out the modal
    setTimeout(() => this.setState({ open: false }), 5000)
    
    // check if there's a 'status' property it will handle all each error message, 
    // otherwise it will send data
    return (post.response.hasOwnProperty('status'))
      ? this.handleError(response)
      : this.submitLogin(post);
  }

  // function for send body data to redux action
  submitLogin = postData => {
    // reset input data state
    const { history, postLogin } = this.props;
    this.setState({
      open: true,
      errMessage: postData.response,
      email: '',
      password: '',
      errResponse: {}
    })
    // post data to redux
    postLogin(postData);
    history.push('/users')
    console.log('this.props', this.props)
    // this.setState({open: true, errMessage: submitRes.result || 'submited'})
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
    const { email, password, vertical, horizontal, open, errMessage, errResponse } = this.state;
    return (
      <div>
        <h2 style={{ marginBottom: '5px' }}>Just insert your email and password for sign or register.</h2>
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
            placeholder="Insert your email"
            onChange={e => this.onChange(e)}
            value={email}
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
            type="password"
            autoComplete={'false'}
            id="standard-textarea"
            label="password"
            placeholder="Insert password"
            onChange={e => this.onChange(e)}
            value={password}
            multiline
            style={{ marginTop: '0px', width: '80%' }}
            margin="normal"
          />
          <br/>
          <Button type="submit" style={{width: '80%'}} variant="contained" color="primary">
            Sign In / Register
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

LoginForm.propTypes = {
  postLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    posts: state
  })

export default connect(mapStateToProps, { postLogin })(LoginForm);
