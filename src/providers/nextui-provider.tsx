"use client";
import { NextUIProvider } from "@nextui-org/react";
export interface SessionProviderProos {
  children: React.ReactNode;
}

const NextUiProviders = ({ children }: SessionProviderProos) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextUiProviders;