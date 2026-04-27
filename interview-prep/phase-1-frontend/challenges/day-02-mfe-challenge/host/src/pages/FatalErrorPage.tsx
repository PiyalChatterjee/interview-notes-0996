import { useLocation, useNavigate } from 'react-router-dom'
import { logger } from '../utils/logger'

export function FatalErrorPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { error = 'Unknown error', retryCount = 0 } = location.state || {}
  const correlationId = logger.getCorrelationId()

  const handleGoHome = () => {
    // Reset correlation ID for new session
    navigate('/', { replace: true, state: { _clear: true } })
  }

  const handleContactSupport = () => {
    const subject = encodeURIComponent(`MFE Fatal Error - Correlation ID: ${correlationId}`)
    const body = encodeURIComponent(
      `I encountered a fatal error in the Products feature.\n\nError: ${error}\nCorrelation ID: ${correlationId}\nRetry attempts: ${retryCount}`
    )
    window.location.href = `mailto:support@example.com?subject=${subject}&body=${body}`
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Service Unavailable</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        We're sorry, but the products feature is currently unavailable.
      </p>

      <div
        style={{
          background: '#f8f9fa',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'left',
          maxWidth: '500px',
          margin: '0 auto 2rem',
        }}
      >
        <p style={{ margin: '0 0 0.5rem' }}>
          <strong>What happened:</strong> The products module failed to load after {retryCount} attempts.
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.9em', color: '#666' }}>
          <strong>Error:</strong> {error}
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.85em', color: '#999' }}>
          <strong>Correlation ID:</strong> <code>{correlationId}</code>
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={handleGoHome}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Go to Home
        </button>
        <button
          onClick={handleContactSupport}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Contact Support
        </button>
      </div>

      <p style={{ marginTop: '2rem', fontSize: '0.85em', color: '#999' }}>
        Share the Correlation ID with support to help us diagnose the issue faster.
      </p>
    </div>
  )
}
