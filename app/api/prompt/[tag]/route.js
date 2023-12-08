//GET
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export default GET = async (req, res, next, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ prompt: params.prompt }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
