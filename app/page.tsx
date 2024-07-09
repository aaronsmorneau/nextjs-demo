//import Feed from '@components/Feed';

import Feed from "@components/Feed";

const Home = (props: any) => {
    return (
        <section className="w=full flex-center flex-col">
            <h1 className="head_text text-center">
                DWITTER
                <br className="max-md:hidden" />
                
            </h1>
            <h2>
                <span className="blue_gradient text-center"> It's like Twitter, but worse!</span>
            </h2>
            <p className="desc text-center">
                Have you ever wanted to use a social media platform that's worse than Twitter?
                Do you dislike the thought of large tech companies harvesting your personal data?
                Or perhaps you just really dislike Elon Musk right now...
                <br />
                <br />
                If any of this applies to you... 
                <br /> 
                <br /> 

                Welcome to Dwitter, where you can share your thoughts in <strong><i>HOWEVER MANY CHARACTERS YOU WANT!</i></strong>
            </p>
            <Feed />
        </section>
    );
}

export default Home;