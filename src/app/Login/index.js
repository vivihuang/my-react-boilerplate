import React, { Component } from 'react'

import LoginForm from './components/LoginForm'

import styles from './Login.scss'

class Login extends Component {
  handleLogin(values) {
    console.log('login test', values)
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Please login in first.</h2>
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    )
  }
}

export default Login
