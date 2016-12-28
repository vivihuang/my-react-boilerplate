import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

import './Icon.scss'

class Icon extends Component {
  static defaultProps = {
    isSvg: false
  }

  static propTypes = {
    children: React.PropTypes.element,
    icon: PropTypes.string,
    isSvg: PropTypes.bool,
    className: PropTypes.string
  }

  render() {
    const { icon, isSvg, className, ...other } = this.props

    const getIconType = () => (isSvg ? `ui-svgicon-${icon}` : `ui-icon-${icon}`)

    return (
      <i className={classnames('icon', getIconType(), className)} {...other} >
        {this.props.children}
      </i>
    )
  }
}

export default Icon
