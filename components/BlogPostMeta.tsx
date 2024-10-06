import { Metadata } from "next";

interface BlogPostMetaProps {
  title: string;
  subtitle: string;
  slug: string;
}

export function generateBlogPostMeta({
  title,
  subtitle,
  slug,
}: BlogPostMetaProps): Metadata {
  const ogImageUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
    subtitle
  )}`;

  return {
    title,
    description: subtitle,
    openGraph: {
      title,
      description: subtitle,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: subtitle,
      images: [ogImageUrl],
    },
  };
}
