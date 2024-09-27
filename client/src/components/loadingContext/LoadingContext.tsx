import { createContext, useState, useContext, ReactNode } from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: (b: boolean) => void;
}

// Creating a LoadingContext
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Custom hook to use loading state and setLoading function
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

// LoadingProvider component to wrap your app and provide loading state
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// LoadingContext consumer component to use loading state
export const LoadingConsumer = ({
  children,
}: {
  children: (loading: boolean) => ReactNode;
}) => {
  const { loading } = useLoading();
  return children(loading);
};
