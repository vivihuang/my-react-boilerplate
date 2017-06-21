import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'

import Loader from '../../components/Loader'

import styles from './Layout.scss'

const mapStateToProps = state => ({
  activeRequests: state.activeRequests.toJS()
})

const Layout = ({ activeRequests, children }) => {
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

Layout.propTypes = {
  activeRequests: PropTypes.shape({}).isRequired,
  children: PropTypes.element
}

export default withRouter(connect(mapStateToProps)(Layout))
