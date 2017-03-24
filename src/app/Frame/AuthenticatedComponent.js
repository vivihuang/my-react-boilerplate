import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  user: state.user.toJS()
})

export default (WrappedComponent, defaultConfig) => {
  const config = Object.assign({
    auth: true
  }, defaultConfig)

  @connect(mapStateToProps)
  class AuthenticatedComponent extends Component {
    static propTypes = {
      user: PropTypes.shape({}),
      history: PropTypes.shape({}).isRequired
    }

    componentWillMount() {
      this.checkAuth()
    }

    componentWillReceiveProps() {
      this.checkAuth()
    }

    checkAuth() {
      const { user, history } = this.props
      const token = user && user.token

      if (config.auth && !token) {
        return history.replace('login')
      }

      if (!config.auth && token) {
        return history.replace('/')
      }
      return history
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  return withRouter(AuthenticatedComponent)
}
