import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { Metadata } from "next";
import { getBaseUrl, generateOgImageUrl } from "@/utils/url";

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.replace(/^posts\//, ""),
  }));
};

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const post = allPosts.find(
    (p) => p._raw.flattenedPath.replace(/^posts\//, "") === params.slug
  );
  if (!post) return { title: "Post Not Found" };

  const pagePath = `/posts/${params.slug}`;
  const baseUrl = getBaseUrl();
  const fullUrl = `${baseUrl}${pagePath}`;
  const ogImageUrl = generateOgImageUrl(post.title, post.date);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: fullUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 628,
          alt: post.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (p) => p._raw.flattenedPath.replace(/^posts\//, "") === params.slug
  );

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-600">Post not found for slug: {params.slug}</p>
        <div className="mt-4 p-4 rounded">
          <p className="font-mono text-sm">Available slugs:</p>
          {allPosts.map((p) => (
            <p key={p._raw.flattenedPath} className="font-mono text-sm">
              {p._raw.flattenedPath}
            </p>
          ))}
        </div>
      </div>
    );
  }

  const Content = getMDXComponent(post.body.code);

  return (
    <article className="py-4 mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-extrabold text-4xl leading-9 mb-2 tracking-tight text-gray-900 dark:text-white sm:leading-10  md:leading-14">
          {post.title}
        </h1>
        <time dateTime={post.date} className="mb-1 text-lg text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
      </div>
      <div className="prose dark:prose-invert">
        <Content />
      </div>
    </article>
  );
};

export default PostLayout;
