// app/not-found.tsx

import React from "react";

export default function NotFound() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground mt-2">
        Sorry, the page doesn&apos;t exist.
      </p>
    </div>
  );
}
