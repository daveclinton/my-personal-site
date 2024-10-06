import { Post } from "@/.contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default function PostsCard(post: Post) {
  return (
    <div className="w-full mt-1 overflow-hidden">
      <div className="flex gap-x-3 items-center">
        <time dateTime={post.date} className="block mb-2 text-gray-600">
          {format(parseISO(post.date), "d LLL,  yyyy")}
        </time>
        <Link
          href={post.url}
          className="text-gray-600 underline dark:text-gray-300 mb-2"
        >
          {post.title}
        </Link>
      </div>
    </div>
  );
}
