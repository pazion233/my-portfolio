import { Component, type ReactNode } from "react";

export interface WebGLErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("WebGL rendered with error, using fallback:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function WebGLFallback({
  className,
  message = "This carousel needs WebGL, which is unavailable in this browser.",
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center p-8 text-center text-sm text-stone-400 bg-[#1C1C1C] ${
        className || ""
      }`}
    >
      <div className="max-w-md space-y-2">
        <p className="font-semibold text-stone-300">WebGL Acceleration Unavailable</p>
        <p className="text-xs text-stone-500">{message}</p>
      </div>
    </div>
  );
}
