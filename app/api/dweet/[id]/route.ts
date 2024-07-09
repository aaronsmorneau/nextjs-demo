import Dweet from "@models/Dweet";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }): Promise<Response> => {
    try {
        console.log("getting dweet api call")
        await connectToDB()

        const dweet = await Dweet.findById(params.id).populate("creator")
        if (!dweet) return new Response("Dweet Not Found", { status: 404 });

        return new Response(JSON.stringify(dweet), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }): Promise<Response> => {
    const { dweet, tag }: { dweet: string, tag: string } = await request.json();

    try {
        await connectToDB();

        // Find the existing dweet by ID
        const existingDweet = await Dweet.findById(params.id);

        if (!existingDweet) {
            return new Response("Dweet not found", { status: 404 });
        }

        // Update the dweet with new data
        existingDweet.dweet = dweet;
        existingDweet.tag = tag;

        await existingDweet.save();

        return new Response("Successfully updated the Dweet", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Dweet", { status: 500 });
    }
};

export const DELETE = async (request, { params }): Promise<Response> => {
    try {
        await connectToDB();

        // Find the dweet by ID and remove it
        await Dweet.findByIdAndDelete(params.id);

        return new Response("Dweet deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting dweet", { status: 500 });
    }
};