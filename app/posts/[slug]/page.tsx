import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { Metadata } from "next";

export const generateStaticParams = async () => {
  console.log(
    "Generated paths:",
    allPosts.map((post) => post._raw.flattenedPath)
  );
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
};

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  console.log("Metadata - All posts:", allPosts);
  console.log("Metadata - Looking for slug:", params.slug);

  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  console.log("Metadata - Found post:", post);

  if (!post) return { title: "Post Not Found" };
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  console.log("Layout - All posts:", allPosts);
  console.log("Layout - Looking for slug:", params.slug);

  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  console.log("Layout - Found post:", post);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-600">Post not found for slug: {params.slug}</p>
        <div className="mt-4 p-4  rounded">
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
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1>{post.title}</h1>
      </div>
      <Content />
    </article>
  );
};

export default PostLayout;
