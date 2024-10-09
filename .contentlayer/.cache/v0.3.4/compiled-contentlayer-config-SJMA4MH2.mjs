// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string" }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}`
    }
  }
}));
var Projects = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the project",
      required: true
    },
    description: {
      type: "string",
      description: "A brief description of the project",
      required: true
    },
    technologies: {
      type: "list",
      of: { type: "string" },
      required: true,
      description: "List of technologies used in the project"
    },
    link: {
      type: "string",
      description: "The link of the project",
      required: true
    },
    status: {
      type: "enum",
      options: ["In Progress", "Completed", "On Hold"],
      default: "In Progress"
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`
    }
  }
}));
var Home = defineDocumentType(() => ({
  name: "Home",
  filePathPattern: `home/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string" }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Post, Projects, Home]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-SJMA4MH2.mjs.map
