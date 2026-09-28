const allowedPostAuthPaths = new Set(["/dashboard"]);

export function getSafePostAuthDestination(value: string | null | undefined) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return null;
  }

  const url = new URL(value, "https://dreli.local");

  if (url.pathname === "/app") {
    return `/dashboard${url.search}${url.hash}`;
  }

  if (!allowedPostAuthPaths.has(url.pathname)) {
    return null;
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

export function getSetupPath(next: string | null | undefined) {
  const destination = getSafePostAuthDestination(next);
  return destination
    ? `/setup?next=${encodeURIComponent(destination)}`
    : "/setup";
}
