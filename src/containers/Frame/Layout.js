import React from 'react'
import PropTypes from 'prop-types'

const Layout = ({ children }) => (<div className='page-stage-layout'>{children}</div>)

Layout.propTypes = {
  children: PropTypes.element
}

export default Layout
