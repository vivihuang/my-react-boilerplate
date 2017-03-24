import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Button } from 'react-bootstrap'

import styles from './LoginForm.scss'

const LoginForm = ({ handleSubmit }) => (
  <form
    role='form'
    className={styles.loginForm}
    onSubmit={handleSubmit}
  >
    <Field
      className={styles.row}
      name='email'
      type='email'
      component='input'
      placeholder='Email'
    />
    <Field
      className={styles.row}
      name='password'
      type='password'
      component='input'
      placeholder='Password'
    />
    <Button type='submit'>Login</Button>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: `${__filename}_FORM`
})(LoginForm)
