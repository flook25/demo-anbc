import { cacheLife } from "next/cache";

// Cached so the page stays static. The year refreshes when the cache expires.
export default async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
