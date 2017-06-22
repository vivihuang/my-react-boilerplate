import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  ui: state.ui.toJS()
})
const Layout = ({ children, ui }) => (
  <div className='page-stage-layout'>
    {ui.hasApiError ? <h2>has error</h2> : null}
    {children}
  </div>)

Layout.propTypes = {
  children: PropTypes.element,
  ui: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps)(Layout)
