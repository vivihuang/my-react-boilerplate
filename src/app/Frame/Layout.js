import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import Immutable from 'immutable'
import Loader from '../../components/Loader'

import styles from './Layout.scss'

const mapStateToProps = state => ({
  activeRequests: state.activeRequests
})

@connect(mapStateToProps)
class Layout extends Component {
  static propTypes = {
    children: PropTypes.element,
    activeRequests: PropTypes.instanceOf(Immutable.Map).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      hasLoading: false
    }
    this.timer = null
  }

  componentWillReceiveProps(nextProps) {
    const { activeRequests } = this.props
    const currentTotal = activeRequests.get('total')
    const nextTotal = nextProps.activeRequests.get('total')
    if (!currentTotal && nextTotal && !this.timer) {
      this.timer = window.setTimeout(() => {
        this.setLoadingState(true)
      }, 1000)
    }
    if (!nextTotal) {
      if (this.timer) {
        window.clearTimeout(this.timer)
        this.timer = null
      }
      this.setLoadingState(false)
    }
  }

  @autobind
  setLoadingState(bool) {
    this.setState({ hasLoading: bool })
  }

  render() {
    const { hasLoading } = this.state

    return (
      <div className={classnames('page-stage-layout')}>
        { React.cloneElement(this.props.children, {
          className: classnames({
            [styles.loadingOpen]: hasLoading
          })
        })}
        <Loader show={hasLoading} text='' />
      </div>
    )
  }
}

export default Layout
