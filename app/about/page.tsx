import { allHomes } from "@/.contentlayer/generated/index.mjs";
import { getMDXComponent } from "next-contentlayer/hooks";
import React from "react";

const AboutPage = () => {
  const aboutMe = allHomes;
  const Content = getMDXComponent(aboutMe[1].body.code);
  return (
    <React.Fragment>
      <div className="prose dark:prose-invert my-5 max-w-4xl">
        <Content />
      </div>
    </React.Fragment>
  );
};

export default AboutPage;
