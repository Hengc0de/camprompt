import React from "react";
import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />
        <span className="blue_gradient">AI Prompts</span>
      </h1>
      <p className="desc text-center">
        CamPrompts is an AI Prompting tool for modern world to discover and
        share creative and interesting prompts
      </p>
      <Feed></Feed>
    </section>
  );
};

export default Home;
