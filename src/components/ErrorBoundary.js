import React, { Component } from "react";
import NotFoundPage from "../pages/NotFoundPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render NotFoundPage or a custom error UI
      return (
        <NotFoundPage message="Something went wrong. Please try again later." />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
