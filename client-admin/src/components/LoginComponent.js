import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
// import '../css/Login.css';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <div className="login-container fade-in">
          <h2 className="login-title">ADMIN LOGIN</h2>
          <form className="login-form">
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={this.state.txtUsername} 
                onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={this.state.txtPassword} 
                onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
              />
            </div>
            <div className="form-group">
              <input 
                type="submit" 
                value="LOGIN" 
                className="btn btn-primary"
                onClick={(e) => this.btnLoginClick(e)} 
              />
            </div>
          </form>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
        this.setState({ txtUsername: '', txtPassword: '' });
      }
    });
  }
}
export default Login;