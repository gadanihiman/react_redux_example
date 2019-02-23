import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import UserForm from '../components/UserForm';
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

class ListUsers extends Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    errMessage: 'Error',
    email: '',
    oldemail: '',
    password: '',
    errResponse: {}
  }
  
  componentDidMount() {
    this.props.fetchPosts();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleEdit = (e, user) => {
    this.setState({oldemail: user.email, email: user.email, password: user.password});
  }

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
      : `Company ${email} created!`;

    // create body post
    const post = {
      email, password,
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
      email: '',
      password: '',
      errResponse: {}
    })

    var allUsers = JSON.parse(localStorage.getItem('Users'));
    const filteredUser = allUsers.filter(user => user.email !== this.state.oldemail);
    const newUsers = [...filteredUser, postData];
    console.log('filteredUser', filteredUser)
    localStorage.setItem('Users', JSON.stringify(newUsers));
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

    // get all companies data from storage
    var allUsers = JSON.parse(localStorage.getItem('Users'));
    console.log('allUsers', allUsers)
    
    return (
      <div style={{ width: '45%' }}>
      Edit and Create Form:
        <form style={{marginBottom: 10}} className={styles.container} onSubmit={this.onSubmit}>
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
        <h2> LIST USERS: (click edit button to edit the user)</h2>

        {allUsers && allUsers.map((user, index) => 
          <Card
            key={index}
            style={{ 
              display: 'inline-block', 
              width: '100%', 
              marginBottom: 10,
              marginTop: 10 
            }}>
            <CardContent>
              <Typography style={{fontSize: 17}} color="textSecondary" gutterBottom>
                {user.email}
              </Typography>
              <hr></hr>
              <Typography variant="h6" component="h6">
                password:
              </Typography>
              <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
                {user.password}
              </Typography>
              <Button onClick={e => this.handleEdit(e, user)} variant="fab" mini color="primary" aria-label="Add">
                <EditIcon fontSize="small"/>
              </Button>
            </CardContent>
          </Card>
      )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  newCompany: state.posts.item
});

export default withRouter(connect(mapStateToProps, { fetchPosts })(ListUsers));
