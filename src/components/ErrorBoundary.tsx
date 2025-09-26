import React, { ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Replaced constructor with class property for state initialization.
  // This resolves an issue where the TypeScript compiler failed to recognize `this.state` and `this.props`.
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg flex flex-col items-center justify-center text-center p-4 antialiased text-text-dark dark:text-text-light">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
            >
                <i className="ph-fill ph-warning-octagon text-6xl text-accent-pink mb-4"></i>
                <h1 className="text-3xl font-bold mb-2">Something went wrong.</h1>
                <p className="text-text-muted mb-6 max-w-md">
                    An unexpected error occurred. Please try refreshing the page. If the problem persists, please contact support.
                </p>
                <motion.button
                    onClick={() => window.location.reload()}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Refresh Page
                </motion.button>
            </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
