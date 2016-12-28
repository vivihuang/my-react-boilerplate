import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

import Spinner from '../Icon/Spinner'
import styles from './loader.scss'

class Loader extends Component {
  static propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    show: PropTypes.bool
  }

  getClassesString() {
    return classnames(
      styles.Loader,
      { [styles.active]: this.props.show },
      this.props.className
    )
  }

  render() {
    return (
      <div className={this.getClassesString()}>
        <div className={styles.Container}>
          <Spinner className={styles.Spinner} />
          <p className={styles.Text}>
            { this.props.text }
          </p>
        </div>
      </div>
    )
  }
}

export default Loader
