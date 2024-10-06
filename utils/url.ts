export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.trim().replace(/\/$/, "");
  }
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

export function generateOgImageUrl(title: string, date?: string) {
  const baseUrl = getBaseUrl();
  const params = new URLSearchParams();

  if (title) params.set("title", title);
  if (date) params.set("date", date);

  return `${baseUrl}/api/og?${params.toString()}`;
}
