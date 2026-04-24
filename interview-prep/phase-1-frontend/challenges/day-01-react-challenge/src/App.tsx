import { Suspense, lazy } from 'react';
import './App.css';

// Code splitting - each route is a separate chunk (improves TTI for PWA)
const SearchPage = lazy(() => import('./components/SearchPage'));
const ContactForm = lazy(() => import('./components/ContactForm'));

// Skeleton fallback - prevents CLS (Cumulative Layout Shift)
function PageSkeleton() {
  return (
    <div className="skeleton-container" aria-busy="true" aria-label="Loading...">
      <div className="skeleton-header" />
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
    </div>
  );
}

function App() {
  return (
    <div className="app-shell">
      {/* App Shell: NavBar is always instant (from SW cache) */}
      <nav className="navbar">
        <h1>Interview Prep App</h1>
        <span className="badge">React 18/19 | PWA | Day 1</span>
      </nav>

      <main className="content">
        {/*
          CHALLENGE TODO:
          1. Implement SearchPage with useTransition + useDeferredValue
          2. Implement ContactForm with useActionState (React 19)
          3. Both are lazy-loaded - Suspense handles the loading state
        */}
        <Suspense fallback={<PageSkeleton />}>
          <SearchPage />
        </Suspense>

        <Suspense fallback={<PageSkeleton />}>
          <ContactForm />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
