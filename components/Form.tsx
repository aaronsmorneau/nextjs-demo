import Link from 'next/link';

const Form = ({ 
    type, 
    post, 
    setPost, 
    submitting, 
    handleSubmit 
}: {
    type: string,
    post: Post,
    setPost: (arg0: Post) => void,
    submitting: boolean,
    handleSubmit: (arg0: any) => void
}) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className='blue_gradient'>{type} a Dweet</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share a Dweet with the world.

            </p>
            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2x1 flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your dweet
                    </span>
                    <textarea
                        value={post.dweet}
                        onChange={(e) => setPost({ ...post, dweet: e.target.value })}
                        placeholder="Write your dweet here..."
                        required
                        className="form_textarea" 
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag
                        <span className='font-normal'>
                            (ex: #CelebrityGossip, #Politics, #HouseOfTheDragon) 
                        </span>
                    </span>
                    <input
                        value={post.tag}
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                        placeholder="#Tag"
                        required
                        className="form_input" 
                    />
                     <div className='flex-end mx-3 mb-5 gap-4'>
                        <Link href='/' className='text-gray-500 text-sm'>
                            Cancel
                        </Link>

                        <button
                            type='submit'
                            disabled={submitting}
                            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                        >
                            {submitting ? `${type}ing...` : type}
                        </button>
                        </div>
                </label>

            </form>
        </section>
    )
}

export default Form;