"use client";

import { useEffect } from "react";

export function ChunkLoadRecovery() {
  useEffect(() => {
    function handleError(event: ErrorEvent) {
      const message = event.message || "";
      if (message.includes("ChunkLoadError") || message.includes("Loading chunk")) {
        window.location.reload();
      }
    }

    function handleRejection(event: PromiseRejectionEvent) {
      const reason = String(event.reason ?? "");
      if (reason.includes("ChunkLoadError") || reason.includes("Loading chunk")) {
        window.location.reload();
      }
    }

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
