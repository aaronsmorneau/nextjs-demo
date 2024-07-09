"use client";

import { useState, useEffect } from "react";

import DweetCard from "./DweetCard";

const DweetCardList = 
({ 
  data,
  handleTagClick
}: {
  data: Post[],
  handleTagClick: (tagName: string) => void
}) => {
  return (
    <div className='mt-10 dweet_layout'>
      {data.map((post) => (
        <DweetCard
          handleEdit={() => {}}
          handleDelete={() => {}}
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  // Search states
  const [searchText, setSearchText] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/dweet", {
      cache: "no-cache",
    });
    const data = await response.json();

    console.log('data is: ', data);
    setAllPosts(data);
  };

  useEffect(() => {
    console.log('fetching posts');
    fetchPosts();
  }, []);

  const filterDweets = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator?.username || '') ||
        regex.test(item.tag) ||
        regex.test(item.dweet)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterDweets(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterDweets(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Dweets */}
      {searchText ? (
        <DweetCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <DweetCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;