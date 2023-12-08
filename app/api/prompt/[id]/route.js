//GET
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

//PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};
//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    // or await findByIdAndRemove
    await Prompt.findByIdAndRemove(params.id);
    // const existingPrompt = await Prompt.findById(params.id);
    // if (!existingPrompt) {
    //   return new Response("Prompt not found", { status: 404 });
    // }
    // await existingPrompt.delete();
    return new Response("Prompt deleted", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};