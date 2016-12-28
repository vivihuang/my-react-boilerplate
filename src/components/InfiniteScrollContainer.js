import React, { PropTypes, Component } from 'react'
import { throttle } from 'lodash'

const PADDING = 100
const INTERVAL = 300

const STYLE = {
  outer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    overflowY: 'auto'
  },
  inner: {
    width: '100%'
  }
}

class InfiniteScrollContainer extends Component {
  componentDidMount() {
    this.interval = Number.isFinite(this.props.interval) ? +this.props.interval : INTERVAL
    this.padding = Number.isFinite(this.props.padding) ? +this.props.padding : PADDING

    this.throttledScroll = throttle(this.onScroll.bind(this), this.interval)
  }

  onScroll(e) {
    if (this.props.disabled) {
      return
    }

    const target = e.target

    if (target) {
      const remaining = target.scrollHeight - (target.clientHeight + target.scrollTop)
      if (target.scrollHeight > target.offsetHeight && remaining < this.padding) {
        this.props.onScroll()
      }
    }
  }

  handleScroll = (e) => {
    e.persist()
    this.throttledScroll(e)
  }


  render() {
    return (
      <div
        ref='outer'
        className='InfiniteScroll'
        style={STYLE.outer}
        onScrollCapture={this.handleScroll}
      >
        <div className='InfiniteScroll__Inner' style={STYLE.inner}>
          {this.props.children}
        </div>
      </div>
    )
  }

}

InfiniteScrollContainer.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  padding: PropTypes.number,
  interval: PropTypes.number,
  onScroll: PropTypes.func.isRequired
}

export default InfiniteScrollContainer
