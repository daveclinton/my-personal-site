export type SlugData = {
  name: string;
  value: number;
}[];

export async function getSlugData(): Promise<SlugData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSlugData`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: SlugData = await response.json();
    return data;
  } catch (e) {
    console.error("Failed to fetch slug data:", e);
    throw e;
  }
}
