import OpenAI from "openai";
import dotenv from 'dotenv'
import fs from 'fs'
import os from 'os'
import path from "path"
import clipboardy from 'clipboardy'
import { File } from "buffer";
import sharp from "sharp";
dotenv.config()

const client = new OpenAI();

// const upload = await client.fules.create({
//     file: res.locals.imageBuffer ,
//     purpose: "vision "
// })

const LLMPromptService = () => {

}

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

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BELOW WE ARE WORKING WITH THE DALL-E MODEL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


LLMPromptService.imageGenerationModel = async (req, res, next) => {
    try {
        const dataUrl = res.locals.dataUrl;
    
        const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
        if (!match) throw new Error("Invalid data URL format");
    
        const mime = match[1];
        const base64 = match[2];
        const ext = mime.includes("jpeg") ? "jpg" : "png";
    
        const tempPath = path.join(os.tmpdir(), `input.${ext}`);
        fs.writeFileSync(tempPath, Buffer.from(base64, "base64"));
    
        const response = await client.images.edit({
          model: "gpt-image-1",
          image: fs.createReadStream(tempPath),
          prompt: `
    Focus only on the roof closest to the center.
    Ignore all other roofs.
    Generate a clean aerial roof wireframe.
    Eaves, rakes, hips, ridges = solid black.
    Valleys = black dotted lines.
    White background.
    Return PNG.
          `.trim(),
          size: "1024x1024",
          output_format: "png"
        });
    
        const pngBase64 = response.data[0].b64_json;
        const outputPath = path.join(process.cwd(), "wireframe.png");
    
        fs.writeFileSync(outputPath, Buffer.from(pngBase64, "base64"));
    
        res.locals.wireframePath = outputPath;
    
        next();
      } catch (err) {
        console.error(err);
        res.locals.error = err.message;
        next();
      }
    };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////***** BASIC DALLE INTERACTION BELOW THESE COMMENTS*****///////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////*****BASIC DALLE INTERACTION BELOW THESE COMMENTS*****///////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////*****BASIC DALLE INTERACTION BELOW THESE COMMENTS*****/////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //CURRENTLY TESTING PASSING IN BOTH VARIABLES TO DEVELOP
  //SCOPE SHEET WITH AERIAL WIREFRAME. {CURRENTLY TESTING IN FLOWER.PNG}
    LLMPromptService.basicDalleInteraction = async (req,res,next) => {

        console.log("WE ARE INSIDE OF BASIC DALLE INTERACTION MIDDLEWARE FUNCTION")

        //builds the file path to scopesheet image
        const scopeSheetPath = path.join(
            process.cwd(),
            "public",
            "flower.png"
          );

        //This part processes the image using Sharp
        const imageBuffer = await sharp(scopeSheetPath)
            .ensureAlpha()
            .png()
            .toBuffer()

            
        const imageFile = new File([imageBuffer], 'flower.png', { type: 'image/png' });

        const response = await client.images.edit({
            model: "dall-e-2",
            image:  imageFile,
            prompt: "change the background behing the red flower to black. ",
            size: "1024x1024",
            response_format: "b64_json"
            
          });
        
          const imageBase64 = response.data[0].b64_json;
          fs.writeFileSync(
            "TESTeditedScope.png",
            Buffer.from(imageBase64, "base64")
          );
        
          console.log("Saved The 'scopeSheet' edited with prompt that says  " + response.prompt);
        }
    
    

export default LLMPromptService;

// try {
//     const response = await client.responses.create({
//         model: "gpt-image-1",
//         input: [
//             {
//                 role: "developer",
//                 content: [
//                     {
//                         type: "input_text",
//                         text: `
//     Take the image provided and focus on the roof that is most in the middle of the image.
//     after you have selected the roof that is most in the middle ignore every other roof in the image.
//     Take the roof we are focusing on and develop an aerial wireframe of the roof layout.
//     basically diagram the ridges, Hips, Valleys, Rakes and eaves.
//     Make sure the shape of the wireframe developed is accurate to the roof image provided
//                         `.trim(),
//                     },
//                 ],
//             },
//             {
//                 role: "user",
//                 content: [
//                     {
//                         type: "input_text",
//                         text: `Please generate an image based on the above instructions`,
//                     },
//                     {
//                         type: "input_image",
//                         image_url: res.locals.dataUrl,
//                         detail: "high",
//                     },
//                 ],
//             },
//         ],
//         temperature: 0,
//         max_output_tokens: 2500,
//     });

//     res.locals.wireframeSvg = response.output_text?.trim();

//     fs.writeFileSync("wireframe.svg", res.locals.wireframeSvg)
//     console.log(res.locals.wireframeSvg)
//     console.log('WE ARE AT THE END OF THE QUERT')
//     next();
// } catch (err) {
//     console.error(err);
//     res.locals.wireframeSvg = "ERROR: model request failed";
//     next();
// }