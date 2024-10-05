import { allPosts } from "@/.contentlayer/generated";
import PostsCard from "@/components/Posts";
import { compareDesc } from "date-fns";
import React from "react";

const AllPosts = () => {
  const latestPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div>
      <h1 className="text-xl font-extrabold leading-9 mb-2 tracking-tight text-gray-900 dark:text-white sm:text-xl sm:leading-10 md:text-2xl md:leading-14">
        {`All Posts 🪙`}
      </h1>
      {latestPosts.map((post, idx) => (
        <PostsCard key={idx} {...post} />
      ))}
    </div>
  );
};

export default AllPosts;
