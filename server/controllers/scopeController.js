const { data } = require("react-router-dom");



const scopeController = () => {}

//Calls function to API for coordinates = [lat, lon]
scopeController.getCoordinates = async(req, res, next) => {

    //GET https://atlas.microsoft.com/search/address/{format}?api-version=1.0&query={query}

    const key = process.env.AZURE_MAPS_PRIMARY_KEY
    const address = req.body.address
    const customURL = `https://atlas.microsoft.com/search/address/json?subscription-key=${key}&api-version=1.0&query=${encodeURIComponent(address)}`;
    // ANSWER TO GET RESPONSE CAN BE SEEN HERE> https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address?view=rest-maps-1.0&tabs=HTTP
    
    const response = await fetch(customURL,{
        method : 'GET'
    });
    const data = await response.json()

    //I STILL NEED TO STRINGIFY MY "DATA" 
    let firstResult =  data.results[0].position
    JSON.stringify(firstResult, null)
    const { lat, lon } = data.results[0].position
    const coordinates = [lat, lon]
    
    console.log(coordinates)
    

    return next();
}


module.exports = scopeController;
