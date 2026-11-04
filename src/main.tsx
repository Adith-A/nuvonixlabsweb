import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RootErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: '#FFFFFF',
          color: '#001F3F',
          padding: '24px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '520px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Nuvonix Labs</h1>
            <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '20px' }}>
              We encountered a display issue while loading the application interface.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#001F3F',
                color: '#FFFFFF',
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
if (rootEl) {
  // If pre-rendered HTML exists, hydrate it; otherwise createRoot
  if (rootEl.hasChildNodes()) {
    try {
      hydrateRoot(
        rootEl,
        <RootErrorBoundary>
          <App />
        </RootErrorBoundary>
      );
    } catch (e) {
      console.warn('Hydration mismatch fallback to client render:', e);
      createRoot(rootEl).render(
        <RootErrorBoundary>
          <App />
        </RootErrorBoundary>
      );
    }
  } else {
    createRoot(rootEl).render(
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    );
  }
}
