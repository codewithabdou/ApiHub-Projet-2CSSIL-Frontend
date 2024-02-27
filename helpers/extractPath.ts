// Helper function to extract language-specific path
export default function getExtractedPath(pathname: string): string {
  if (pathname === "/ar" || pathname === "/en" || pathname === "/fr")
    return "/";

  const match = pathname.match(/\/(ar|en|fr)(\/[^\/]+\/?)?/);
  return match ? match[2] : pathname;
}
