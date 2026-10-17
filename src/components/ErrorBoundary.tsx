import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[ErrorBoundary] Uncaught render error:", error, info.componentStack);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
          Runtime / Interrupted
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-[-0.02em] text-ink dark:text-white sm:text-3xl">
          Something broke on this view.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500 dark:text-zinc-400">
          A component failed to render. You can retry the view or return to the homepage.
        </p>
        <div className="mt-7 flex items-center gap-3">
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80 dark:bg-white dark:text-ink"
          >
            Retry
          </button>
          <a
            href="/"
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
          >
            Go home
          </a>
        </div>
      </div>
    );
  }
}
