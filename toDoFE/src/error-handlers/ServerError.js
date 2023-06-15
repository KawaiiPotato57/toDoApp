import React, { useState } from 'react';

const ServerError = (fallbackUI) => {
  const [hasError, setHasError] = useState(false);

  const onError = (error) => {
    console.error(error);
    setHasError(true);
  };

  const resetError = () => {
    setHasError(false);
  };

  const ErrorBoundary = ({ children }) => {
    if (hasError) {
      return fallbackUI;
    }

    return <React.Fragment>{children}</React.Fragment>;
  };

  return { onError, resetError, ErrorBoundary };
};

export default ServerError;
