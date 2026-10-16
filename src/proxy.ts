import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed middleware.ts to proxy.ts. This redirects "/" to
// "/th" or "/zh" based on the visitor's cookie or Accept-Language header.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next.js internals and any file with an extension.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
