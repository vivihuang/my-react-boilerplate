import React, { PropTypes } from 'react'

const Frame = ({ children }) => (
  <div>
    <h2>Test Page</h2>
    <div>{children}</div>
  </div>
)

Frame.propTypes = {
  children: PropTypes.node
}

export default Frame
