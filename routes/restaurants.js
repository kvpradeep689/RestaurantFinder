var express = require('express');
var router = express.Router();
var db = require('../dbaccess/db')

// Connect to Mongo on start
db.connect();

//Get all restaurants
router.get('/restaurants', function(req, res, next){
    console.log('Rest API: Getting restaurants')
    //Get the collection
    db.getCollection('restaurants', function(err, restaurants){
            if(err){
                res.send(err);
            }
            res.json(restaurants);
        });
}); 

//Get single restaurant
router.get('/restaurant/:id', function(req, res, next){
    console.log('Rest API: Getting single restaurant' + req.params.id)
    //Get single document
    db.getDocumentInCollection('restaurants', req.params.id, function(err, restaurant){
        if(err){
            res.send(err);
        }
        res.json(restaurant);
    });
});

//Add Restaurant
router.post('/restaurant', function(req, res, next){
    var restaurant = req.body;
    console.log('Rest API: Add restaurant ' + restaurant.name)
    //Validate the restaurant info
    if(!restaurant.name || !isValidRating(restaurant.rating)){
        var errorMessage = buildErrorMessage(restaurant);
        res.status(400);
        res.json({
            "error": errorMessage
        });
    }
    else{
        //Add document to database
        db.addDocument('restaurants', restaurant, function(err, restaurant){
            if(err){
                res.send(err);
            }
            res.json(restaurant);
        });
    }
    console.log('Rest API: Added restaurant ' + restaurant._id)
});

//Delete single restaurant
router.delete('/restaurant/:id', function(req, res, next){
    console.log('Rest API: Deleting restaurant ' + req.params.id)
    //Delete the document
    db.deleteDocument('restaurants', req.params.id, function(err, restaurant){
        if(err){
            res.send(err);
        }
        res.json(restaurant);
    });
    console.log('Rest API: Deleted restaurant ' + req.params.id)
});

//Update restaurant
router.put('/restaurant/:id', function(req, res, next){
    var restaurant = req.body;
    var updrestaurant = {};

    if(restaurant.name){
        updrestaurant.name = restaurant.name;
    }
    if(restaurant.cuisine){
        updrestaurant.cuisine = restaurant.cuisine;
    }
    if(restaurant.description){
        updrestaurant.description = restaurant.description;
    }
    if(restaurant.city){
        updrestaurant.city = restaurant.city;
    }
    if(restaurant.state){
        updrestaurant.state = restaurant.state;
    }
    if(restaurant.rating){
        updrestaurant.rating = restaurant.rating;
    }
    //Validate the restaurant information
    if(!updrestaurant || !isValidRating(updrestaurant.rating)){
        var errorMessage = buildErrorMessage(updrestaurant);
        res.status(400);
        res.json({
            "error": errorMessage
        });
    }
    else{
        //Update restaurant information to database
        db.updateDocument('restaurants', updrestaurant, req.params.id, function(err, restaurant){
            if(err){
                res.send(err);
            }
            res.json(restaurant);
        });
    }
});

//Build the error message to propogate to the UI
function buildErrorMessage(restaurant)
{
    var errorMessage = "";
    //console.log(restaurant);
    if(!restaurant.name)
    {
        errorMessage = "Name is required to add restaurant. "
    }
    if(!isValidRating(restaurant.rating))
    {
        errorMessage += "Rating should be a number between 1 and 5. "
     }
    errorMessage += "Invalid data. Check your request."
    return errorMessage;
}

//Validate the rating
function isValidRating(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n >= 1 && n <= 5;
}

module.exports = router;