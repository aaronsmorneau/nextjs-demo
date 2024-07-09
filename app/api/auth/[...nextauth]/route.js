import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/User";
import { connectToDB } from "@utils/database";

/*console.log({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
});*/

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],

    callbacks: {
        async session({session}) {
            if (!session?.user) {
                console.log('no session user');
                return session;
            }

            const sessionUser = await User.findOne({ email: session.user.email });
            session.user['id'] = sessionUser?._id.toString() || '';
            session.user['username'] = sessionUser?.username || '';
            //console.log('sessionUser is', sessionUser);
            //console.log('session.user is', session.user);

            return session;
        },
    
        async signIn({profile}) {
            try {
                //console.log({profile});
                if (!profile) {
                    //console.log('no profile');
                    return false;
                }
                await connectToDB();

                //checks if a user already exists in the database
                const userExists = await User.findOne({email: profile.email});

                if (!userExists) {
                    await User.create({
                        _id: profile.email,
                        email: profile.email,
                        username: profile.email.split('@')[0].replaceAll(" ", "").replaceAll(".", "").toLowerCase(),
                        image: profile.picture,
                        name: profile.name
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
    
});

export {handler as GET, handler as POST};