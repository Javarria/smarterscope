


const GeoImageService = () => {}

//Calls function to API for coordinates = [lat, lon]
GeoImageService.getCoordinates = async(req, res, next) => {

    // USING Azure: Search - Get Search Address to turn address to coordinates
    //GET https://atlas.microsoft.com/search/address/{format}?api-version=1.0&query={query}

    const key = process.env.AZURE_MAPS_PRIMARY_KEY
    const address = req.body.address
    const customURL = `https://atlas.microsoft.com/search/address/json?subscription-key=${key}&api-version=1.0&query=${encodeURIComponent(address)}`;
    // ANSWER TO GET RESPONSE CAN BE SEEN HERE> https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address?view=rest-maps-1.0&tabs=HTTP
    
    const response = await fetch(customURL,{
        method : 'GET'
    });
    const data = await response.json()

    //RETREIVING FIRST RESULT OF AN ARRAY WITHIN AN OBJECT NAMED 'data'
    let firstResult =  data.results[0].position
    JSON.stringify(firstResult, null)
    const { lat, lon } = data.results[0].position
    const coordinates = [lat, lon]
    
    //console.log("These are the coordinates produced by user input:    " + coordinates)
    //console.log(coordinates)
   
    res.locals.address = address
    res.locals.coordinates = coordinates
    res.locals.key = key

    console.log(res.locals.coordinates)

    return next();
}

// &titlesetId={micrisoft.imagery} parameter allows for satelite images


GeoImageService.captureImage = async(req,res,next) => {
//FYI I cannot increase &zoom{19} parameter to 20 because it will cause an error

    //minor testing to ensure coordinates transferred between middleware
    console.log("WE ARE INSIDE CAPTURE LAT: " + res.locals.coordinates[0])
    console.log("WE ARE INSIDE CAPTURE LON:  " + res.locals.coordinates[1])
    console.log("THIS IS THE API KEY: " + res.locals.key)
    
    const captureURL = `https://atlas.microsoft.com/map/static?api-version=2024-04-01&center=${res.locals.coordinates[1]},${res.locals.coordinates[0]}&zoom=${19}&tilesetId=microsoft.imagery&subscription-key=${res.locals.key}`
    
    const response = await fetch(captureURL,{
        method : "GET"
    })


    console.log(response.body)
    const image = await response.url
    const imageBytes = await response.arrayBuffer();

    const base64Image = Buffer.from(imageBytes).toString("base64");
    
    //console.log(buffer)
    //console.log(base64Image)

    //console.log(image + " THIS IS THE LINE THAT LOGS THE URL OF THE RESPONSE")
    res.locals.base64 = base64Image
    res.locals.image = image
    //console.log("THIS IS RES.LOCALS.IMAGE: " + res.locals.image)
    //console.log(res.locals.address)
    
    return next()
    
    // const buffer = await image.arrayBuffer();
}

GeoImageService.parcelBoundryLookup = async(req, res, next) => {

    console.log("WE ARE INSIDE OF THE PARCELBOUNDRY LOOKUP MIDDLEWARE FUNCTION")

    const key = process.env.REGRID_API_KEY

    console.log(key)

    //  let regridURL = `https://app.regrid.com/api/v2/parcels/point?lat=${res.locals.coordinates[0]}&lon=${res.locals.coordinates[1]}&radius=50&token=${key}`

    const regridURL =
  `https://app.regrid.com/api/v2/parcels/address` +
  `?query=${encodeURIComponent(res.locals.address)}` +
  `&token=${key}`;


    const response = await fetch(regridURL, {
        method: "GET"
    })

    const data = await response.json();

    console.log(data.parcels.features[0].geometry.coordinates)
    

}


export default GeoImageService;

// 95 Atlas Dr, Youngsville, NC 27596