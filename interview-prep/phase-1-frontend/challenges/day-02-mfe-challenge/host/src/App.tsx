import { Suspense, lazy, useState, type ComponentType } from 'react'
import './App.css'
import { RemoteErrorBoundary } from './components/RemoteErrorBoundary'

const RemoteProductsSearch = lazy(
  () =>
    Promise.race([
      import('remote_products/ProductsSearch'),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Remote load timeout after 5 seconds')), 5000)
      }),
    ]) as Promise<{ default: ComponentType }>
)

function App() {
  const [remoteKey, setRemoteKey] = useState(0)

  return (
    <div className="host-shell">
      <header className="shell-header">
        <h1>Host Shell</h1>
        <p>Module Federation demo: host loads a remote products feature at runtime.</p>
      </header>

      <section className="shell-panel">
        <h2>Host Owned Concerns</h2>
        <ul>
          <li>Top-level routing and layout</li>
          <li>Auth bootstrap and telemetry</li>
          <li>Error boundary and fallback strategy</li>
        </ul>
      </section>

      <section className="shell-panel">
        <h2>Remote Products Feature</h2>
        <RemoteErrorBoundary
          key={remoteKey}
          onRetry={() => setRemoteKey((prev) => prev + 1)}
        >
          <Suspense fallback={<p className="loading">Loading remote products module...</p>}>
            <RemoteProductsSearch />
          </Suspense>
        </RemoteErrorBoundary>
      </section>

      <section className="shell-panel muted">
        <h2>How to test failure behavior</h2>
        <div>
          Stop the remote dev server and refresh host. You should see the error boundary fallback and a retry button.
        </div>
      </section>

    </div>
  )
}

export default App
