import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  onRetry: () => void
}

type State = {
  hasError: boolean
  message: string
}

export class RemoteErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message: '',
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error.message,
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Host] Remote module failed to load', {
      error,
      info,
      component: 'remote_products/ProductsSearch',
    })
  }

  private handleRetry = () => {
    this.setState({ hasError: false, message: '' })
    this.props.onRetry()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="remote-error" role="alert">
          <h3>Remote unavailable</h3>
          <p>Products module could not be loaded.</p>
          <p className="error-detail">{this.state.message}</p>
          <button type="button" onClick={this.handleRetry}>
            Retry loading remote
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
