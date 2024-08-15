"use client";
import dynamic from "next/dynamic";
export const ShareXButtonClient = dynamic(
  () => import("./ShareXButton").then((mod) => mod.default),
  {
    ssr: false,
  }
);
