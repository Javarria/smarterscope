
const scopeController = () => {}

scopeController.getCoordinates = async(req, res, next) => {


    console.log("WE ARE INSIDE THE GETCORDINATES MMMMMMMMMIDDLEWAREEEEEEEEEE FUNCTION")
    //Get/Store full address from req.body.address

    //send address to API that will turn it into cordinates

    //store result of api call | Add some failsafe 

    //return result to thr next middleware function 

    return next();

}

module.exports = scopeController;
