import next from "next";
import sharp from "sharp";

const GeoImageService = () => {};

//Calls function to API for turning address into coordinates = [lat, lon]
GeoImageService.getCoordinates = async (req, res, next) => {
  // USING Azure: Search - Get Search Address to turn address to coordinates
  //GET https://atlas.microsoft.com/search/address/{format}?api-version=1.0&query={query}

  const key = process.env.AZURE_MAPS_PRIMARY_KEY;
  const address = req.body.address;
  const customURL = `https://atlas.microsoft.com/search/address/json?subscription-key=${key}&api-version=1.0&query=${encodeURIComponent(
    address
  )}`;
  // ANSWER TO GET RESPONSE CAN BE SEEN HERE> https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address?view=rest-maps-1.0&tabs=HTTP

  const response = await fetch(customURL, {
    method: "GET",
  });
  const data = await response.json();

  //RETREIVING FIRST RESULT OF AN ARRAY WITHIN AN OBJECT NAMED 'data'
  let firstResult = data.results[0].position;
  JSON.stringify(firstResult, null);
  const { lat, lon } = data.results[0].position;
  const coordinates = [lat, lon];

  res.locals.latLng = { latitude: lat, longitude: lon };

  res.locals.address = address;
  res.locals.coordinates = coordinates;
  res.locals.key = key;

  return next();
};

GeoImageService.centerCoordinates = async (req, res, next) => {
  //Define URL to buildingInsights API with coordinates of the property of address and NOT the actual structure
  const buildingInsightsAPIUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?key=${process.env.SOLAR_API_KEY}&location.latitude=${res.locals.latLng.latitude}&location.longitude=${res.locals.latLng.longitude}`;

  // Send a GET request to the BuildingInsights API with coordinates of the property. The response will contain the coordinates of the CENTER of the roof.
  const response = await fetch(buildingInsightsAPIUrl, {
    method: "GET",
  });
  const data = await response.json();

  //Center roof coordinates put into a variable
  res.locals.centerRoofCoordinates = [
    data.center.latitude,
    data.center.longitude,
  ];

  next();
};

GeoImageService.solarAerialImageCapture = async (req, res, next) => {
  const key = process.env.SOLAR_API_KEY;

  var latitude = res.locals.centerRoofCoordinates[0];
  var longitude = res.locals.centerRoofCoordinates[1];

  const solarAPIURL = `https://solar.googleapis.com/v1/dataLayers:get?location.latitude=${latitude}&location.longitude=${longitude}&radiusMeters=20&view=FULL_LAYERS&requiredQuality=HIGH&exactQualityRequired=false&key=${key}`;

  //console.log('SOLAR_API_KEY exists:', !!process.env.SOLAR_API_KEY);
  //console.log('SOLAR_API_KEY length:', process.env.SOLAR_API_KEY?.length);
  //console.log('SOLAR_API_KEY first 10 chars:', process.env.SOLAR_API_KEY?.substring(0, 10));
  //console.log('Full URL being called:', solarAPIURL);
  console.log(res.locals.address);

  console.log("WE ARE INSIDE OF SOLAR AERIAL IMAGE CAPTURE");

  const response = await fetch(solarAPIURL, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": key,
    },
  });

  const data = await response.json();

  console.log(data);
  const rgbUrlWithKey = `${data.rgbUrl}&key=${process.env.SOLAR_API_KEY}`;
  const maskUrlWithKey = `${data.maskUrl}&key=${process.env.SOLAR_API_KEY}`;
  const dsmURLWithKey = `${data.dsmUrl}&key=${process.env.SOLAR_API_KEY}`;

  //console.log(rgbUrlWithKey);
  res.locals.geoTiff = rgbUrlWithKey

  //console.log(res.locals.address)

  return next();
};

//FUNCTION TO TURN GEOTIFF URL INTO PNG SO THE AERIAL IMAGE CAN BE DIGESTED BY LLM
GeoImageService.geoTiffURLToPngBuffer = async (req, res, next) => {

  // geoTiffURL Returned From Google API Stored In Res.Locals
  const geoTiffBuffer = res.locals.geoTiff 
  console.log(geoTiffBuffer)
  // Send a network request to download the image data from the provided Google URL
  const response = await fetch(geoTiffBuffer)
  console.log(response.status)
  
  // Downloads the raw binary data of the image into a temporary memory slot
  const arrayBuffer = await response.arrayBuffer()
  
  // Converts that raw data into a Node.js 'Buffer' format that Sharp can read
  const inputBuffer = Buffer.from(arrayBuffer)

  console.log(arrayBuffer)
  
  // Convert raw image data (GeoTIFF) into a standard PNG buffer for the LLM
  res.locals.pngBuffer = await sharp(inputBuffer).png().toBuffer()
  
  console.log(res.locals.pngBuffer)
  // Turn the image file into a text string so we can transmit it to the ChatGPT API
  const base64Image = res.locals.pngBuffer.toString('base64');
  
  //const imageBuffer = Buffer.from(base64, 'base64')
  console.log("LINE AFTER IMAGE BUFFER LINE")
  
  //res.locals.imageBuffer = imageBuffer 


  res.locals.b64 = base64Image

  next()
}


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////***** FUNCTIONS BELOW ARE NOT ESSENTIAL TO AERIAL IMAGE CALCULATIONS OR CAPTURE*****//////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////***** FUNCTIONS BELOW ARE NOT ESSENTIAL TO AERIAL IMAGE CALCULATIONS OR CAPTURE*****//////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////***** FUNCTIONS BELOW ARE NOT ESSENTIAL TO AERIAL IMAGE CALCULATIONS OR CAPTURE*****//////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////***** FUNCTIONS BELOW ARE NOT ESSENTIAL TO AERIAL IMAGE CALCULATIONS OR CAPTURE*****//////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





GeoImageService.parcelBoundryLookup = async (req, res, next) => {
  console.log("WE ARE INSIDE OF THE PARCELBOUNDRY LOOKUP MIDDLEWARE FUNCTION");

  const key = process.env.REGRID_API_KEY;

  console.log("THIS IS THE REGRID API KEY: " + key);

  const regridURL =
    `https://app.regrid.com/api/v2/parcels/address` +
    `?query=${encodeURIComponent(res.locals.address)}` +
    `&token=${key}`;

  const response = await fetch(regridURL, {
    method: "GET",
  });
  const data = await response.json();

  //IF NOTHING COMES BACK FROM THIS LOOKUP TO > data.parcels.features[0].geometry.coordinates[0] > ITS CAUSE THE PARCEL ISNT AVAILABLE TO THE REGRID API (ADDRESS COORDINATES NOT CAPTUREABLE)
  // ERROR WILL PRINT: TypeError: Cannot read properties of undefined (reading 'geometry')
  // ARRAY CONTAINING ARRAY'S OF COORDINATES [LAT, LON]
  let nestedArrayOfCoordinates =
    data.parcels.features[0].geometry.coordinates[0];
  //ARRAY CONTAINING ALL LONGITUDE POINTS
  let lons = nestedArrayOfCoordinates.map(([lon]) => lon);
  //ARRAY CONRAINING ALL LATITUDE POINTS
  let lats = nestedArrayOfCoordinates.map(([_, lat]) => lat);

  console.log(nestedArrayOfCoordinates);
  console.log("THESE ARE THE LONGITUDES OF THE PARCEL:   " + lons);
  console.log("THESE ARE THE LATITUDES OF THE PARCEL:    " + lats);

  let bbox = {
    minLon: Math.min(...lons),
    minLat: Math.min(...lats),
    maxLon: Math.max(...lons),
    maxLat: Math.max(...lats),
  };

  res.locals.bbox = bbox;
  console.log(bbox);
  console.log("This is the line beneath the bbox log in parcel boundry lookup");
  //DOUBLE CHECK TO SEE IF IT WORKS WITH NEGATIVES COORDINATES
  //STILL NEED TO ERROR HANDLE FOR PARCEL BBOX LOOKUP FAILURE [ EX: 95 Atl Dr ]
  next();
};


//AZURE Image capture middleware function
GeoImageService.captureImage = async (req, res, next) => {
  console.log("WE ARE INSIDE THE CAPTUREIMAGE MIDDLEWARE FUNCTION");
  console.log("THIS IS THE API KEY: " + process.env.SOLAR_API_KEY);
  //console.log("THIS IS THE BBOX: " + JSON.stringify(res.locals.bbox))

  //Destructuring res.locals.bbox to pass it to API in acceptable STRING format.
  const { minLon, minLat, maxLon, maxLat } = res.locals.bbox;
  const bboxString = `${minLon},${minLat},${maxLon},${maxLat}`;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////***** NEXT STEP: ADD PADDING TO BBOX *****///////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const captureURL = `https://atlas.microsoft.com/map/static?api-version=2024-04-01&bbox=${bboxString}&zoom=19&tilesetId=microsoft.imagery&subscription-key=${res.locals.key}`;

  const response = await fetch(captureURL, {
    method: "GET",
  });

  const image = await response.url;
  const imageBytes = await response.arrayBuffer();

  const base64Image = Buffer.from(imageBytes).toString("base64");

  res.locals.base64 = base64Image;
  res.locals.image = image;

  console.log("THIS IS RES.LOCALS.IMAGE: " + res.locals.image);
  console.log(res.locals.bbox);
  console.log(bboxString);

  return next();

};

export default GeoImageService;

