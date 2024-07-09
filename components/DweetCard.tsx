"use client";

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import Image from 'next/image';

const DweetCard = 
({ 
  post,
  handleTagClick,
  handleEdit,
  handleDelete
}: {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit: () => void;
  handleDelete: () => void;
}) => {
    const {data: session} = useSession();
    const pathName: string = usePathname();
    const router = useRouter();
    const [copied, setCopied] = useState<string>('');

    const handleProfileClick = () => {
      console.log(post);
  
      if (post.creator?.id === (session?.user as { id: string })?.id) return router.push("/profile");
  
      router.push(`/profile/${post.creator?.id}?name=${post.creator?.username}`);
    };

    const handleCopy = () => {
        setCopied(post.dweet);
        navigator.clipboard.writeText(post.dweet);
        setTimeout(() => setCopied(''), 3000);
    };
    return (
        <div className='dweet_card'>
          <div className='flex justify-between items-start gap-5'>
            <div
              className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
              onClick={handleProfileClick}
            >
              <Image
                src={post.creator?.image || '/assets/images/default_profile.svg'}
                alt='user_image'
                width={40}
                height={40}
                className='rounded-full object-contain'
              />
    
              <div className='flex flex-col'>
                <h3 className='font-satoshi font-semibold text-gray-900'>
                  {post.creator?.username}
                </h3>
                <p className='font-inter text-sm text-gray-500'>
                  {post.creator?.email}
                </p>
              </div>
            </div>
    
            <div className='copy_btn' onClick={handleCopy}>
              <Image
                src={
                  copied === post.dweet
                    ? "/assets/icons/tick.svg"
                    : "/assets/icons/copy.svg"
                }
                alt={copied === post.dweet ? "tick_icon" : "copy_icon"}
                width={12}
                height={12}
              />
            </div>
          </div>
    
          <p className='my-4 font-satoshi text-sm text-gray-700'>{post.dweet}</p>
          <p
            className='font-inter text-sm blue_gradient cursor-pointer'
            onClick={() => handleTagClick && handleTagClick(post.tag)}
          >
            #{post.tag}
          </p>
          {(session?.user as { id: string })?.id === post.creator?.id && pathName === "/profile" && (
            <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p
                className='font-inter text-sm green_gradient cursor-pointer'
                onClick={handleEdit}
            >
                Edit
            </p>
            <p
                className='font-inter text-sm orange_gradient cursor-pointer'
                onClick={handleDelete}
            >
                Delete
            </p>
            </div>
          )}
        </div>
      );
    };

export default DweetCard;