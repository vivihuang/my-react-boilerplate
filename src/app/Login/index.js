import React, { Component } from 'react'

import LoginForm from './components/LoginForm'

import styles from './Login.scss'

class Login extends Component {
  handleLogin() {
    console.log('login test')
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Please login in first.</h2>
        <LoginForm handleSubmit={this.handleLogin} />
      </div>
    )
  }
}

export default Login
