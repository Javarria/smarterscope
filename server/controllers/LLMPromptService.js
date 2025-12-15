import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config()
const client = new OpenAI();

const LLMPromptService = () => {}

LLMPromptService.promptImageForSketch = async(req,res,next) => {

    // console.log(res.locals.base64 +   " : THIS IS INSIDE PROMPTIMAGEFORSKETCH IT IS THE BASE64")

    console.log("WE ARE INSIDE OF PROMPTIMAGEFORSKETCH...")
    console.log("URL OF IMAGE CAPTURED BY AZURE: " + res.locals.image)

    //let URLToImageOfRoof = res.locals.image
    // if (!URLToImageOfRoof.ok) {
    //     throw new Error("Failed to fetch image");
    //   }

    
    // !!!   data:image/png;base64,PASTE_YOUR_BASE64_STRING_HERE  !!!
    // 1.That prefix is not optional. It tells the model:
    // 2.this is an image
    // 3.this is a PNG
    // 4.this is base64 encoded
    // 5.Without it, the model treats it like random text and gets confused.



    // const response = await client.responses.create({
    //     model: "gpt-5-nano",
    //     input: [
    //         {
    //           role: "user",
    //           content: [
    //             {
    //               type: "input_text",
    //               text: `pretend to be a professional drawer and draw a picture of what you see from the provided photo return a image back to me that looks like a hand drawn sketch
                  
    //                     Requirements:
    //                     - Output SVG code ONLY
    //                     - Do NOT include explanations, markdown, or backticks
    //                     - Do NOT include ASCII art
    //                     - SVG must contain roof planes, ridges, and valleys as simple polygons and lines
    //                     - Use a top-down view
    //                     - Use simple stroke and fill colors
    //                     - SVG must be valid and ready to save as a .svg file
    //                     - Do not describe the image, DRAW it as SVG`
    //             },
    //             {
    //               type: "input_image",
    //               image_url: `data:image/png;base64,${res.locals.base64}`
    //             }
    //           ]
    //         }
    //       ]
    // });

    //   console.log(response)  
    
    // ${URLToImageOfRoof}
}

export default LLMPromptService;






