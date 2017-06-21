import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Spinner from './Spinner'

import styles from './index.scss'

const Loader = ({ show, className, text }) => (
  <div className={classnames(styles.loader, { [styles.active]: show }, className)}>
    <div className={styles.container}>
      <Spinner className={styles.spinner} />
      <p className={styles.text}>
        {text}
      </p>
    </div>
  </div>
)

Loader.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  show: PropTypes.bool
}

export default Loader
