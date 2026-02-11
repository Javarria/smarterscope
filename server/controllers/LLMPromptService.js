import OpenAI from "openai";
import dotenv from 'dotenv'
import fs from 'fs'
import clipboardy from 'clipboardy'
dotenv.config()
const client = new OpenAI();

// const upload = await client.fules.create({
//     file: res.locals.imageBuffer ,
//     purpose: "vision "
// })
const LLMPromptService = () => {}

LLMPromptService.promptImageForSketch = async(req,res,next) => {

    console.log("WE ARE INSIDE OF PROMPTIMAGEFORSKETCH...")
    
    // data:image/png;base64,PASTE_YOUR_BASE64_STRING_HERE !! 1.That prefix is not optional. It tells the model:this is an image this is a PNG this is base64 encoded Without it, the model treats it like random text and gets confused.

    const upload = await client.files.create({
        file: res.locals.fileOfImageBuffer,
        purpose: "vision"
    })
    console.log("upload.id")
    console.log(upload)

    console.log("dataUrl type:", typeof res.locals.dataUrl);
    console.log("dataUrl starts:", res.locals.dataUrl?.slice(0, 40));
    console.log("dataUrl length:", res.locals.dataUrl?.length);

   
try{   
    const response = await client.responses.create({ 
        model: "gpt-4.1", // gpt-4o is the standard flagship vision model
        //Input was messages
        input: [
            {
              role: "developer",
              content: [
                {
                  type: "input_text",
                  text: `
    You are a vision system.
    You must output ONLY raw SVG.
    No markdown. No explanations.
    If you cannot read the image, output exactly:
    ERROR: unreadable image
                  `.trim(),
                },
              ],
            },
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text: `
    Return a black and white aerial wireframe
    
  
                  `.trim(),
                },
                {
                  type: "input_image",
                  image_url: res.locals.dataUrl,
                  detail: "high",
                },
              ],
            },
          ],
          temperature: 0,
          max_output_tokens: 2500,
        });

        res.locals.wireframeSvg = response.output_text?.trim();

        fs.writeFileSync("wireframe.svg", res.locals.wireframeSvg)
        console.log(res.locals.wireframeSvg)
        console.log('WE ARE AT THE END OF THE QUERT')
        next();
      }catch (err) {
        console.error(err);
        res.locals.wireframeSvg = "ERROR: model request failed";
        next();
      }
    }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    

    

export default LLMPromptService;

