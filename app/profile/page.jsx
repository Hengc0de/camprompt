"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileComponent from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPost(data);
    };
    if (session?.user.id) fetchPost();
  }, []);

  const [post, setPost] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete this prompt?`
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = post.filter((p) => p._id !== post._id);
        setPost(filteredPosts);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <ProfileComponent
      name="My"
      desc="Welcome to your personalized profile page"
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    ></ProfileComponent>
  );
};

export default MyProfile;
