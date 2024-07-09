import Dweet from "@models/Dweet";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }): Promise<Response> => {
    try {
        await connectToDB()

        const dweets = await Dweet.find({ "creator.id": params.id }).exec();

        return new Response(JSON.stringify(dweets), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch dweets created by user", { status: 500 })
    }
} 