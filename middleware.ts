import { type NextRequest } from "next/server";
// import { updateSession } from "@/utils/supabase/middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/* export async function middleware(request: NextRequest) {
  return await updateSession(request);
} */

const isPublicRoute = createRouteMatcher(["/signin(.*)", "/signup(.*)"]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    // '/(api|trpc)(.*)',
  ]
};
