"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${(session?.user as { id: string })?.id}/posts`);
            const data = await response.json();

            setMyPosts(data);
        };

        if ((session?.user as { id: string })?.id)
                fetchPosts();
    }, [(session?.user as { id: string })?.id]);

    const handleEdit = (post) => {
        router.push(`/profile/update-dweet/${post._id}`);
    };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this dweet?"
    );

    if (hasConfirmed) {
      try {
          await fetch(`/api/dweet/${post._id.toString()}`, {
              method: "DELETE",
          });

          const filteredPosts = myPosts.filter((item: { _id: string }) => item._id !== post._id);

          setMyPosts(filteredPosts);
      } catch (error) {
          console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. You can edit or delete your posts here.'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;