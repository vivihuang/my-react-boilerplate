import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, routerShape } from 'react-router'
import Immutable from 'immutable'

const mapStateToProps = state => ({
  user: state.user
})

export default (WrappedComponent, defaultConfig) => {
  const config = Object.assign({
    auth: true
  }, defaultConfig)

  @connect(mapStateToProps)
  class AuthenticatedComponent extends Component {

    static propTypes = {
      user: PropTypes.instanceOf(Immutable.Map).isRequired,
      router: routerShape.isRequired
    }

    componentWillMount() {
      this.checkAuth()
    }

    componentWillReceiveProps() {
      this.checkAuth()
    }

    checkAuth() {
      const { user, router } = this.props
      const token = user.get('token')

      if (config.auth && !token) {
        return router.replace('login')
      }

      if (!config.auth && token) {
        return router.replace('default')
      }
      return router
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  return withRouter(AuthenticatedComponent)
}
