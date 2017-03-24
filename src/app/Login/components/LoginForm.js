import React, { PropTypes } from 'react'
import { FormControl, Button } from 'react-bootstrap'

import styles from './LoginForm.scss'

const LoginForm = ({ handleSubmit }) => (
  <form className={styles.loginForm} onSubmit={handleSubmit}>
    <FormControl className={styles.row} placeholder='Email' />
    <FormControl className={styles.row} placeholder='Password' />
    <Button type='submit'>Login</Button>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
