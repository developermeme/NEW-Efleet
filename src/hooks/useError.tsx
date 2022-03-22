import React, { useState, useEffect } from "react";

const useError = () => {
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    if (error) {
      let timerFunc = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timerFunc);
    }
  }, [error]);

  return [
    error ? <div className="alert alert--error">{error}</div> : null,
    (error: string) => setError(error),
    () => setError(null),
  ];
};

export default useError;
