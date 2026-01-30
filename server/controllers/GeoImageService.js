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

  res.locals.latLng = { "latitude" : lat , "longitude" : lon }

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
  })
  const data = await response.json()

  //get data.center to get coordinates of center roof coordinates to pass coordinates into image capture and see new view 
  //console.log(res.locals.coordinates)
  //console.log(data.center.latitude)
  //Center roof coordinates put into a variable
  res.locals.centerRoofCoordinates = [data.center.latitude , data.center.longitude]
  //console.log(res.locals.centerRoofCoordinates)
  //console.log("WE ARE AT THE END OF THE MIDDLEWARE FUNCRION")

  //const data = response
  

  next()
}









GeoImageService.solarAerialImageCapture = async (req, res, next) => {

  const key = process.env.SOLAR_API_KEY;

  var latitude = res.locals.centerRoofCoordinates[0]
  var longitude = res.locals.centerRoofCoordinates[1]

  //console.log(longitude)
  //console.log(latitude)

  //console.log('JUST RENDEERD COORDINATES FOR LAT AND LON')

  //console.log('WE ARE LOOKING AT CENTERED LAT AND LON ///////////////////////////////////////////////////////////')


  //console.log("WE ARE INSIDE OF SOLAR AERIAL MIDDLEWARE")
  //console.log("WE HAVE LATITUDE HERE: " + latitude + " AND LONGITUDE HERE: " + longitude)

  //console.log('API SOLAR \\\\\\\ API SOLAR APIIIIIIII: ' + process.env.SOLAR_API_KEY)
  
  //console.log('APIKEY ///////////////////////////////: ' + process.env.AZURE_MAPS_PRIMARY_KEY)

  const solarAPIURL = `https://solar.googleapis.com/v1/dataLayers:get?location.latitude=${latitude}&location.longitude=${longitude}&radiusMeters=24&view=FULL_LAYERS&requiredQuality=HIGH&exactQualityRequired=false&key=${key}`;

  //console.log('SOLAR_API_KEY exists:', !!process.env.SOLAR_API_KEY);
  //console.log('SOLAR_API_KEY length:', process.env.SOLAR_API_KEY?.length);
  //console.log('SOLAR_API_KEY first 10 chars:', process.env.SOLAR_API_KEY?.substring(0, 10));
  //console.log('Full URL being called:', solarAPIURL);
  console.log(res.locals.address)
 
  console.log('WE ARE INSIDE OF SOLARAERIALIMAGECAPTURE/////////////////////')

  const response = await fetch(solarAPIURL, {
    method: "GET",
    headers: {
      'X-Goog-Api-Key': key
    }
  });

  const data = await response.json();

  console.log(data)
  const rgbUrlWithKey = `${data.rgbUrl}&key=${process.env.SOLAR_API_KEY}`;
  const maskUrlWithKey = `${data.maskUrl}&key=${process.env.SOLAR_API_KEY}`;
  const dsmURLWithKey = `${data.dsmUrl}&key=${process.env.SOLAR_API_KEY}`;
  

  console.log(rgbUrlWithKey)

  //console.log(res.locals.address)


  return next()
}




GeoImageService.parcelBoundryLookup = async (req, res, next) => {
  console.log("WE ARE INSIDE OF THE PARCELBOUNDRY LOOKUP MIDDLEWARE FUNCTION");

  const key = process.env.REGRID_API_KEY;

  console.log('THIS IS THE REGRID API KEY: ' + key);

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
  let nestedArrayOfCoordinates = data.parcels.features[0].geometry.coordinates[0]
//ARRAY CONTAINING ALL LONGITUDE POINTS 
  let lons = nestedArrayOfCoordinates.map(([lon]) => lon)
//ARRAY CONRAINING ALL LATITUDE POINTS
  let lats = nestedArrayOfCoordinates.map(([_,lat]) => lat)

  console.log(nestedArrayOfCoordinates)
  console.log("THESE ARE THE LONGITUDES OF THE PARCEL:   " + lons)
  console.log("THESE ARE THE LATITUDES OF THE PARCEL:    " + lats)

  let bbox = {
    minLon : Math.min(...lons),
    minLat : Math.min(...lats),
    maxLon : Math.max(...lons),
    maxLat : Math.max(...lats),
  }

  res.locals.bbox = bbox
  console.log(bbox)
  console.log("This is the line beneath the bbox log in parcel boundry lookup")
  //DOUBLE CHECK TO SEE IF IT WORKS WITH NEGATIVES COORDINATES
  //STILL NEED TO ERROR HANDLE FOR PARCEL BBOX LOOKUP FAILURE [ EX: 95 Atl Dr ]
  next()
};


// &titlesetId={micrisoft.imagery} parameter allows for satelite images

GeoImageService.captureImage = async (req, res, next) => {

  console.log("WE ARE INSIDE THE CAPTUREIMAGE MIDDLEWARE FUNCTION")
  console.log("THIS IS THE API KEY: " + process.env.SOLAR_API_KEY);
  //console.log("THIS IS THE BBOX: " + JSON.stringify(res.locals.bbox))

  //Destructuring res.locals.bbox to pass it to API in acceptable STRING format.
  const { minLon, minLat, maxLon, maxLat } = res.locals.bbox;
  const bboxString = `${minLon},${minLat},${maxLon},${maxLat}`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////***** NEXT STEP: ADD PADDING TO BBOX *****/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ZOOM CHANGED TO 18 
  const captureURL = `https://atlas.microsoft.com/map/static?api-version=2024-04-01&bbox=${bboxString}&zoom=19&tilesetId=microsoft.imagery&subscription-key=${res.locals.key}`;

  const response = await fetch(captureURL, {
    method: "GET",
  });

  //console.log(response.body);
  const image = await response.url;
  const imageBytes = await response.arrayBuffer();

  const base64Image = Buffer.from(imageBytes).toString("base64");

  //console.log(buffer)
  //console.log(base64Image)

  //console.log(image + " THIS IS THE LINE THAT LOGS THE URL OF THE RESPONSE")
  res.locals.base64 = base64Image;
  res.locals.image = image;

  console.log("THIS IS RES.LOCALS.IMAGE: " + res.locals.image)
  console.log(res.locals.bbox)
  console.log(bboxString)
  //console.log(res.locals.address)

  return next();

  // const buffer = await image.arrayBuffer();
};


export default GeoImageService;

// console.log(data.parcels.features[0].geometry.coordinates);
