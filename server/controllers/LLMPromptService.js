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

    // console.log(res.locals.base64 +   " : THIS IS INSIDE PROMPTIMAGEFORSKETCH IT IS THE BASE64")

    //console.log("WE ARE INSIDE OF PROMPTIMAGEFORSKETCH...")
    //console.log(res.locals.b64)
    //console.log("AFTER B64")

   //clipboardy.writeSync(`data:image/png;base64,${res.locals.b64}`);
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
    //               text: `CREATE an image of a wireframe of the aerial image provided. make all the lines thin black lines. make the ridge,Hips,Valleys,Eaves and rakes black lines and return that wireframe image`
    //             },
    //             {
    //               type: "input_image",
    //               image_url: `data:image/png;base64,${res.locals.b64}`
    //             }
    //           ]
    //         }
    //       ]
    // });



    const upload = await client.files.create({
        file: res.locals.fileOfImageBuffer,
        purpose: "vision"
    })
    console.log("upload.id")
    console.log(upload)

    console.log("dataUrl type:", typeof res.locals.dataUrl);
    console.log("dataUrl starts:", res.locals.dataUrl?.slice(0, 40));
    console.log("dataUrl length:", res.locals.dataUrl?.length);

    //TEST TO SEE IF IMAGE IS VISIBLE (CONFIRMED)
//  const b64 = res.locals.dataUrl.replace(/^data:image\/png;base64,/, "");
//fs.writeFileSync("debug-roof.png", Buffer.from(b64, "base64"));
//console.log("Wrote debug-roof.png");

// const response = await client.chat.completions.create({   <<< TESTING THE REMOVAL OF .completions to .responses >>>  const response = await client.responses.create({
        
    const response = await client.chat.completions.create({ 
        model: "gpt-4o", // gpt-4o is the standard flagship vision model
        //Input was messages
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "I have provided an aerial image of a roof. Please identify the Ridges, Hips, Valleys, Eaves, and Rakes. Instead of describing them, output a raw SVG code block that draws a thin black line wireframe of these components on a white background. Output ONLY the SVG code."
                    },{ 
                        type: "image_url", 
                        image_url: { url: res.locals.dataUrl } 
                    }   
                ]
            }
        ],
        // Optional: If you want ChatGPT to actually trigger DALL-E to make a new file
       // tools: [{ type: "image_generation" }] 
    });
    
  
    // IMAGE FILE ATTEMPT TO GET GPT TO READ MY IMAGE WITH A FILE AND NOT IMAGE:URL CAUSED 400 ERR 
    // {
    //     type: "image_file",
    //     image_file: {
    //         file_id: upload.id,
    //         filename: "roof.png"
    //     }
    // }


       console.log(response.choices[0].message.content);

    
    // ${URLToImageOfRoof}
    next()
}

export default LLMPromptService;






