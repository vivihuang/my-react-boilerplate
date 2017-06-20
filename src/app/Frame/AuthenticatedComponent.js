import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  user: state.user.toJS()
})

export default (WrappedComponent, defaultConfig) => {
  const config = Object.assign({
    auth: true
  }, defaultConfig)

  const checkAuth = (role, history) => {
    if (config.auth && !role) {
      history.replace('login')
    }
    if (!config.auth && role) {
      history.replace('/')
    }
  }

  class AuthenticatedComponent extends Component {
    static propTypes = {
      user: PropTypes.shape({
        role: PropTypes.string.isRequired
      }).isRequired,
      history: PropTypes.shape({}).isRequired
    }

    componentWillMount() {
      const { user: { role }, history } = this.props
      checkAuth(role, history)
    }

    componentWillReceiveProps(nextProps) {
      const { user: { role }, history } = nextProps
      checkAuth(role, history)
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
  return withRouter(connect(mapStateToProps)(AuthenticatedComponent))
}
