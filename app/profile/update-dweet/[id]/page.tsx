"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateDweet = ({ params }) => {
  const router = useRouter();
  const dweetId = params.id;
  const [post, setPost] = useState<Post>({ dweet: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    //console.log('params are: ', params);
    const getDweetDetails = async () => {
      const response = await fetch(`/api/dweet/${dweetId}`);
      const data = await response.json();

      setPost({
        dweet: data.dweet,
        tag: data.tag,
      });
    };

    if (dweetId) getDweetDetails();
  }, [dweetId]);

  const updateDweet = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!dweetId) return alert("Missing DweetId!");

    try {
      const response = await fetch(`/api/dweet/${dweetId}`, {
        method: "PATCH",
        body: JSON.stringify({
          dweet: post.dweet,
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
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateDweet}
    />
  );
};

export default UpdateDweet;