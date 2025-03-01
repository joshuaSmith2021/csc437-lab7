import { useEffect, useState } from "react";
import { GroceryData, groceryFetcher } from "./groceryFetcher";

export const useGroceryFetch = (datasource: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [groceries, setGroceries] = useState<GroceryData | undefined>(
    undefined,
  );

  useEffect(() => {
    let isStale = false;
    setIsLoading(true);
    setError(undefined);
    setGroceries(undefined);
    groceryFetcher
      .fetch(datasource)
      .then((data) => {
        if (!isStale) {
          setGroceries(data);
        }
      })
      .catch((e: Error) => {
        if (!isStale) {
          setError(e);
        }
      })
      .finally(() => {
        if (!isStale) {
          setIsLoading(false);
        }
      });

    return () => {
      isStale = false;
    };
  }, [datasource]);

  return { data: groceries, loading: isLoading, error };
};
