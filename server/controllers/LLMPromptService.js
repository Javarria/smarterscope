import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config()
const client = new OpenAI();

const LLMPromptService = () => {}

LLMPromptService.promptImageForSketch = async(req,res,next) => {

    console.log(res.locals.base64 +   " : THIS IS INSIDE PROMPTIMAGEFORSKETCH IT IS THE BASE64")
    //let URLToImageOfRoof = res.locals.image

    // if (!URLToImageOfRoof.ok) {
    //     throw new Error("Failed to fetch image");
    //   }

    // let binaryDataOfImage = URLToImageOfRoof.arrayBuffer()

    // console.log(binaryDataOfImage)
    
    // console.log("WE ARE INSIDE OF THE PROMPT TO SKETCH PART OF THE APPLICATION")

    // console.log("INSIDE OF PROMPT CONTROLLER. THIS IS IMAGE URL> " + URLToImageOfRoof)

    // !!!data:image/png;base64,PASTE_YOUR_BASE64_STRING_HERE!!!
    // 1.That prefix is not optional. It tells the model:
    // 2.this is an image
    // 3.this is a PNG
    // 4.this is base64 encoded
    // 5.Without it, the model treats it like random text and gets confused.



    // const response = await client.responses.create({
    //     model: "gpt-5-nano",
    //     input: `in 2 sentances describe what you see inside of the image i am giving to you here> ${URLToImageOfRoof}`
    // });

    //  console.log(response)
    

}

export default LLMPromptService;