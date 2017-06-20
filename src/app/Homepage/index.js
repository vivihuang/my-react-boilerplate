import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  user: state.user.toJS()
})

const Homepage = ({ user }) => (
  <div>
    <h2>Hi, {user.username}, welcome to homepage!</h2>
  </div>
)

Homepage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
}

export default connect(mapStateToProps)(Homepage)
