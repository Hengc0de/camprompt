import PromptCard from "./PromptCard";
import React from "react";

const ProfileComponent = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  handleTagClick,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient">{name} Profile</h1>
      <p className="desc">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            // handleTagClick={handleTagClick}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          ></PromptCard>
        ))}
      </div>
    </section>
  );
};

export default ProfileComponent;
