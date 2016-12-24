var express = require('express');
var router = express.Router();
//Used to interact with mongodb
var mongojs = require('mongojs');
var db = mongojs('mongodb://pradeep:pradeep@ds145138.mlab.com:45138/restaurants_pradeep', ['restaurants']);

//Get all restaurants
router.get('/restaurants', function(req, res, next){
    //res.send('Restaurantes API');
    db.restaurants.find(function(err, restaurants){
        if(err){
            res.send(err);
        }
        res.json(restaurants);
    });
});

//Get single restaurant
router.get('/restaurant/:id', function(req, res, next){
    db.restaurants.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, restaurant){
        if(err){
            res.send(err);
        }
        res.json(restaurant);
    });
});

//Add Restaurant
router.post('/restaurant', function(req, res, next){
    var restaurant = req.body;
    if(!restaurant.name || !restaurant.cuisine){
        res.status(400);
        res.json({
            "error": "Invalid data. Check your request."
        });
    }
    else{
        db.restaurants.save(restaurant, function(err, restaurant){
            if(err){
                res.send(err);
            }
            res.json(restaurant);
        });
    }
});

//Delete single restaurant
router.delete('/restaurant/:id', function(req, res, next){
    db.restaurants.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, restaurant){
        if(err){
            res.send(err);
        }
        res.json(restaurant);
    });
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
    if(restaurant.cuisine){
        updrestaurant.description = restaurant.description;
    }
    if(restaurant.cuisine){
        updrestaurant.city = restaurant.city;
    }
    if(restaurant.cuisine){
        updrestaurant.state = restaurant.state;
    }
    if(restaurant.cuisine){
        updrestaurant.rating = restaurant.rating;
    }
    
    if(!updrestaurant){
        res.status(400);
        res.json({
            "error": "Invalid data. Check your request."
        });
    }
    else{
        db.restaurants.update({_id: mongojs.ObjectId(req.params.id)}, updrestaurant, {}, function(err, restaurant){
            if(err){
                res.send(err);
            }
            res.json(restaurant);
        });
    }
});

module.exports = router;