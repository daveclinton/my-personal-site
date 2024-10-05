import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
  },
}));

const Projects = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the project",
      required: true,
    },
    description: {
      type: "string",
      description: "A brief description of the project",
      required: true,
    },
    technologies: {
      type: "list",
      of: { type: "string" },
      required: true,
      description: "List of technologies used in the project",
    },
    link: {
      type: "string",
      description: "The link of the project",
      required: true,
    },
    status: {
      type: "enum",
      options: ["In Progress", "Completed", "On Hold"],
      default: "In Progress",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post, Projects],
});
