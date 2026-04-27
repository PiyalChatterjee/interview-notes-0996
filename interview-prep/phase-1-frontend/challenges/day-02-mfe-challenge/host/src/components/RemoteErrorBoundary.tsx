import { Component, type ErrorInfo, type ReactNode } from 'react'
import { logger } from '../utils/logger'
import { telemetry } from '../utils/telemetry'

const MAX_RETRIES = 3
const REMOTE_NAME = 'remote_products'

type Props = {
  children: ReactNode
  onRetry: () => void
  onFatalError?: (error: Error, retryCount: number) => void
}

type State = {
  hasError: boolean
  message: string
  retryCount: number
}

export class RemoteErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message: '',
    retryCount: 0,
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      message: error.message,
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { retryCount } = this.state
    const isFatal = retryCount >= MAX_RETRIES

    // Structured logging with correlation ID
    logger.error(
      `[${REMOTE_NAME}] Module load failed`,
      error,
      {
        component: 'RemoteErrorBoundary',
        remoteName: REMOTE_NAME,
        retryCount,
        isFatal,
        errorInfo: info.componentStack,
      }
    )

    // Telemetry tracking
    telemetry.recordRemoteLoadFailure(REMOTE_NAME, error, retryCount, isFatal)

    // Trigger fatal error callback if max retries exhausted
    if (isFatal && this.props.onFatalError) {
      telemetry.recordFatalError(REMOTE_NAME, error, retryCount)
      this.props.onFatalError(error, retryCount)
    }
  }

  private handleRetry = () => {
    const newRetryCount = this.state.retryCount + 1
    logger.info(`Attempting retry ${newRetryCount} of ${MAX_RETRIES + 1}`, {
      component: 'RemoteErrorBoundary',
      remoteName: REMOTE_NAME,
      retryCount: newRetryCount,
    })
    this.setState({ hasError: false, message: '', retryCount: newRetryCount })
    this.props.onRetry()
  }

  private isFatal = (): boolean => this.state.retryCount >= MAX_RETRIES

  render() {
    if (this.state.hasError) {
      const isFatal = this.isFatal()
      const correlationId = logger.getCorrelationId()

      return (
        <div className="remote-error" role="alert">
          <h3>{isFatal ? 'Products Service Unavailable' : 'Remote unavailable'}</h3>
          <p>
            {isFatal
              ? 'The products feature could not be restored after multiple attempts.'
              : 'Products module could not be loaded.'}
          </p>
          <p className="error-detail">{this.state.message}</p>
          <p style={{ fontSize: '0.8em', color: '#999' }}>Correlation ID: {correlationId}</p>
          {!isFatal && (
            <>
              <p style={{ fontSize: '0.85em', color: '#666' }}>
                Attempt {this.state.retryCount + 1} of {MAX_RETRIES + 1}
              </p>
              <button type="button" onClick={this.handleRetry}>
                Retry loading remote
              </button>
            </>
          )}
          {isFatal && (
            <p style={{ fontSize: '0.9em', color: '#d9534f', marginTop: '1rem' }}>
              Please refresh the page or contact support. Reference ID: {correlationId}
            </p>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
