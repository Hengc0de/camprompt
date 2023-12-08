"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import React from "react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        ></PromptCard>
      ))}
    </div>
  );
};
const Feed = () => {
  const [post, setPost] = useState([]);

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
    };
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          placeholder="Search for a tag or username..."
          value={searchText}
          type="text"
          className="search_input peer"
          onChange={handleSearchChange}
        />
      </form>
      <PromptCardList data={post} handleTagClick={() => {}}></PromptCardList>
    </section>
  );
};

export default Feed;
