import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './index.scss'

const Icon = ({ icon, isSvg, className, children, ...other }) => {
  const getIconType = () => (isSvg ? `ui-svgicon-${icon}` : `ui-icon-${icon}`)

  return (
    <i className={classnames('icon', getIconType(), className)} {...other} >
      {children}
    </i>
  )
}

Icon.defaultProps = {
  isSvg: false
}

Icon.propTypes = {
  children: PropTypes.element,
  icon: PropTypes.string,
  isSvg: PropTypes.bool,
  className: PropTypes.string
}

export default Icon
