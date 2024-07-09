"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response: Response = await fetch(`/api/users/${params?.id}/posts`, {
        cache: "no-cache"
      });
      const data: Post[] = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName || 'User'}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional dweets and be inspired by the power of their imagination`}
      data={userPosts}
      handleDelete={() => {}}
      handleEdit={() => {}}
    />
  );
};

export default UserProfile;