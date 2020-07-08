import React from 'react'
import PropTypes from 'prop-types'

class DefaultErrorBoundery extends React.Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    return hasError ? <span>Something went wrong!</span> : children
  }
}

DefaultErrorBoundery.propTypes = {
  children: PropTypes.any,
}

export default DefaultErrorBoundery
