const { data } = require("react-router-dom");



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

    const image = await response

    console.log(image)
    console.log(res.locals.address + "We already used next() to get into the other middleware function")

    return next()

}


module.exports = GeoImageService;

// 95 Atlas Dr, Youngsville, NC 27596