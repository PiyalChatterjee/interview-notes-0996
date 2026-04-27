import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Suspense, lazy, useState, useEffect, type ComponentType } from 'react'
import './App.css'
import { RemoteErrorBoundary } from './components/RemoteErrorBoundary'
import { FatalErrorPage } from './pages/FatalErrorPage'
import { manifestLoader } from './utils/manifest-loader'
import { logger } from './utils/logger'
import { telemetry } from './utils/telemetry'

const REMOTE_TIMEOUT_MS = 5000
const REMOTE_NAME = 'remote_products'

const RemoteProductsSearch = lazy(() => {
  const startTime = Date.now()
  telemetry.recordRemoteLoadStart(REMOTE_NAME)

  return Promise.race([
    import('remote_products/ProductsSearch').then((module) => {
      telemetry.recordRemoteLoadSuccess(REMOTE_NAME, startTime)
      logger.info(`${REMOTE_NAME} loaded successfully`, {
        component: 'RemoteLoader',
        remoteName: REMOTE_NAME,
        duration: `${Date.now() - startTime}ms`,
      })
      return module
    }),
    new Promise((_, reject) => {
      setTimeout(() => {
        telemetry.recordTimeout(REMOTE_NAME, REMOTE_TIMEOUT_MS)
        const timeoutError = new Error(
          `Remote load timeout after ${REMOTE_TIMEOUT_MS}ms for ${REMOTE_NAME}`
        )
        logger.warn(`${REMOTE_NAME} load timeout`, {
          component: 'RemoteLoader',
          remoteName: REMOTE_NAME,
          timeoutMs: REMOTE_TIMEOUT_MS,
        })
        reject(timeoutError)
      }, REMOTE_TIMEOUT_MS)
    }),
  ]) as Promise<{ default: ComponentType }>
})

function HostShell() {
  const [remoteKey, setRemoteKey] = useState(0)
  const navigate = useNavigate()

  const handleFatalError = (error: Error, retryCount: number) => {
    logger.error('[HostShell] Navigating to fatal error page', error, {
      component: 'HostShell',
      retryCount,
    })
    navigate('/error/fatal', {
      state: { error: error.message, retryCount },
    })
  }

  return (
    <div className="host-shell">
      <header className="shell-header">
        <h1>Host Shell – Production-Grade MFE</h1>
        <p>
          Module Federation with error resilience, logging, telemetry, and dynamic manifest loading.
        </p>
      </header>

      <section className="shell-panel">
        <h2>Host Owned Concerns</h2>
        <ul>
          <li>Top-level routing and layout (React Router)</li>
          <li>Error boundary with max-retry circuit breaker</li>
          <li>Structured logging with correlation IDs</li>
          <li>Telemetry events for remote load/failure</li>
          <li>Dynamic manifest loader for remote URLs</li>
        </ul>
      </section>

      <section className="shell-panel">
        <h2>Remote Products Feature</h2>
        <RemoteErrorBoundary
          key={remoteKey}
          onRetry={() => setRemoteKey((prev) => prev + 1)}
          onFatalError={handleFatalError}
        >
          <Suspense fallback={<p className="loading">Loading remote products module...</p>}>
            <RemoteProductsSearch />
          </Suspense>
        </RemoteErrorBoundary>
      </section>

      <section className="shell-panel muted">
        <h2>Test Failure Scenarios</h2>
        <div>
          <p>
            <strong>Recoverable error:</strong> Stop the remote dev server and refresh host. You'll
            see the error boundary fallback and retry button (up to 3 attempts).
          </p>
          <p>
            <strong>Fatal error:</strong> After 3 failed retries, you'll be routed to a fatal error
            page with correlation ID for support.
          </p>
          <p>
            <strong>Check console:</strong> Look at the browser console to see structured logs and
            telemetry events with correlation IDs.
          </p>
        </div>
      </section>
    </div>
  )
}

function App() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize manifest loader (production: load from config server)
    manifestLoader.useDefaults()
    logger.info('Application initialized', {
      component: 'App',
    })
    setIsInitialized(true)
  }, [])

  if (!isInitialized) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Initializing...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HostShell />} />
        <Route path="/error/fatal" element={<FatalErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
