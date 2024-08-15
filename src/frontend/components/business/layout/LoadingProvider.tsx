"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingPage from "./LoadingPage";
import { ReactNode } from "react";
import ShowWhen from "../../ui/showWhen";

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const { isLoading } = useUser();
  return (
    <>
      <ShowWhen showWhen={isLoading}>
        <LoadingPage />
      </ShowWhen>
      {children}
    </>
  );
};

export default LoadingProvider;
