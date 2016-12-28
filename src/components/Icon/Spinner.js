import React, { PropTypes } from 'react'
import classnames from 'classnames'

import Icon from './index'
import styles from './Spinner.scss'

const Spinner = ({ className }) => (
  <span className={classnames(styles.SpinnerV2, className)}>
    <span className={styles.SpinnerIcon1}>
      <span className={styles.innerIcon}>
        <Icon icon='logo' className={styles.icon} />
      </span>
    </span>
    <span className={styles.SpinnerIcon2}>
      <span className={styles.innerIcon}>
        <Icon icon='logo' className={styles.icon} />
      </span>
    </span>
  </span>
)

Spinner.propTypes = {
  className: PropTypes.string
}

export default Spinner
