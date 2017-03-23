import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'

import Loader from '../../components/Loader'

import styles from './Layout.scss'

const mapStateToProps = state => ({
  activeRequests: state.activeRequests.toJS()
})

@connect(mapStateToProps)
class Layout extends Component {
  static propTypes = {
    children: PropTypes.element,
    activeRequests: PropTypes.shape({})
  }

  render() {
    const { activeRequests, children } = this.props
    const hasLoading = !!activeRequests.total

    return (
      <div className={classnames('page-stage-layout')}>
        { React.cloneElement(children, {
          className: classnames({
            [styles.loadingOpen]: hasLoading
          })
        })}
        <Loader show={hasLoading} text='' />
      </div>
    )
  }
}

export default withRouter(Layout)
