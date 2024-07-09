import DweetCard from "./DweetCard";

const Profile = (
{ name,
  desc,
  data,
  handleEdit,
  handleDelete 
}: {
  name: string,
  desc: string,
  data: Post[],
  handleEdit: (post: Post) => void,
  handleDelete: (post: Post) => void
}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

    <div className='mt-10 dweet_layout'>
        {data.map((post) => (
            <DweetCard
                post={post}
                key={post._id}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
                handleTagClick={undefined}
            />
        ))}
    </div>
    </section>
  );
};

export default Profile;