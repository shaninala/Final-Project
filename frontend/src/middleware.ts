import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public (accessible without authentication)
const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/",
  "/contact_us",
  "/contact_us/confirmation", 
  "/gas",
  /^\/gas\/[^\/]+$/,
]);

export default clerkMiddleware(async (auth, request) => {
  // Check if the current route is NOT public
  if (!isPublicRoute(request)) {
    // If the route is not public, protect it
    await auth.protect();
  }
});

// Configuration to specify which routes the middleware applies to
export const config = {
  matcher: [
    // Exclude Next.js internals and static files (images, CSS, etc.)
    // This ensures these files won't be affected by the authentication middleware
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    "/(api|trpc)(.*)",
  ],
};
