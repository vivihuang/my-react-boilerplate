import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { login } from '../../redux/actions/user'
import LoginForm from './components/LoginForm'

import styles from './Login.scss'

const mapDispatchToProps = {
  login
}

const Login = ({ login }) => {
  const handleLogin = (values) => {
    login(values)
  }

  return (
    <div className={styles.root}>
      <h2>Please login in first.</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Login)
