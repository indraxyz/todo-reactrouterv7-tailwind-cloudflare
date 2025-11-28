import { ReactNode } from "react";
import { SuspenseBoundary } from "./SuspenseBoundary";
import { ErrorBoundary } from "./ErrorBoundary";
import { LoadingSpinner } from "./LoadingSpinner";

interface AsyncComponentProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  loadingText?: string;
}

/**
 * Wrapper component that combines Suspense and ErrorBoundary
 * for better async component handling
 */
export function AsyncComponent({
  children,
  loadingFallback,
  errorFallback,
  loadingText,
}: AsyncComponentProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <SuspenseBoundary
        fallback={loadingFallback}
        loadingText={loadingText}
      >
        {children}
      </SuspenseBoundary>
    </ErrorBoundary>
  );
}

