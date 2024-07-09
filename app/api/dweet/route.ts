import { connectToDB  } from "@utils/database";
import Dweet from "@models/Dweet";

export const GET = async (request): Promise<Response> => {
    try{
        console.log("GET request made to /api/dweet");
        await connectToDB();
        const dweets = await Dweet.find({}, {cache: false}).exec();

        console.log('dweets are: ', dweets);
        return new Response(JSON.stringify(dweets), { status: 200 });
    } catch ( error ) {
        return new Response("Failed to retrieve dweets", { status: 500 });
    }
}