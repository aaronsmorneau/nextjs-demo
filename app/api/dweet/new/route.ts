import Dweet from "@models/Dweet";
import { connectToDB } from "../../../../utils/database";

export const POST = async (request): Promise<Response> => {
    const { user, dweet, tag }: { user: Creator, dweet: string, tag: string } = await request.json();

    try {
        console.log("Creating a new dweet from api route");
        await connectToDB();
        const newDweet = new Dweet({ creator: user, dweet, tag });

        await newDweet.save();
        return new Response(JSON.stringify(newDweet), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new dweet", { status: 500 });
    }
}