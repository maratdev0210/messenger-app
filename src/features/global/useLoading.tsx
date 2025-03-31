// Simulate the loading process with setTimeout

import { useState, useEffect } from "react";

function useLoading(timeout: number) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    const simulateLoad = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, timeout));
      } finally {
        setIsLoading(false);
      }
    };

    simulateLoad();
  }, []);

  return isLoading;
}

export { useLoading };
