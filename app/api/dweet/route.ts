import { connectToDB  } from "@utils/database";
import Dweet from "@models/Dweet";

export const GET = async (request): Promise<Response> => {
    try{
        await connectToDB();
        const dweets = await Dweet.find().exec();
        return new Response(JSON.stringify(dweets), { status: 200 });
    } catch ( error ) {
        return new Response("Failed to retrieve dweets", { status: 500 });
    }
}