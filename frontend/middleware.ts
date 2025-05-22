import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes to protect
const isProtectedRoute = createRouteMatcher([
  "/profile",
  // add other protected routes here
]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    // This will redirect to sign-in if user not authenticated
    await auth.protect();
  }

  // You can get userId if needed (not mandatory)
  // const { userId } = await auth();
});

export const config = {
  matcher: [
    // Protect all routes except Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Also protect API routes
    "/(api|trpc)(.*)",
  ],
};
