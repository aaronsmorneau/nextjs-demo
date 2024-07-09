"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateDweet = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ dweet: "", tag: "", creator: { id: "", username: "", email: "", image: "", name: "" }});

  const createDweet = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(session?.user);

    try {
      const response: Response = await fetch("/api/dweet/new", {
        method: "POST",
        body: JSON.stringify({
          dweet: post.dweet,
          user: session?.user,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createDweet}
    />
  );
};

export default CreateDweet;