//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let db = require('../dbaccess/db');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

let newRestaurants = [
                        {
                            "name": "McDonalds",
                            "description": "Fast food chain",
                            "city": "Charleston",
                            "state": "South Carolina",
                            "cuisine": "American",
                            "rating": 4
                        },
                        {
                            "name": "Olive Garden",
                            "description": "Dine in Italian restaurant",
                            "city": "Charleston",
                            "state": "South Carolina",
                            "cuisine": "Italian",
                            "rating": 4
                        },
                        {
                            "name": "Andolinis",
                            "description": "Pizza restaurant",
                            "city": "Charleston",
                            "state": "South Carolina",
                            "cuisine": "Italian",
                            "rating": 3
                        },
                        {
                            "name": "Taste of Thai",
                            "description": "Tasty food from Thailand",
                            "city": "Charleston",
                            "state": "South Carolina",
                            "cuisine": "Asian",
                            "rating": 4
                        }
                    ];

var addedRestaurants = [];
describe('API Tests', function() {
  before(function() {
    db.connect();
    var flag = false;
    //Delete all the restaurants from the database
    db.getCollection('restaurants', function(err, restaurants){
            if(err){
                console.log(err);
            }
            //console.log(restaurants);
            restaurants.forEach(function(element) {
                db.deleteDocument('restaurants', element._id, function(err, restaurant){
                        if(err){
                            console.log(err);
                        }
                    });
            }, this);
        });
    console.log('Adding new restaurants for test cases');
    newRestaurants.forEach(function(rest) {
        db.addDocument('restaurants', rest, function(err, restaurant){
                        if(err){
                            console.log(err);
                        }
                    });
        }, this);
    
    db.getCollection('restaurants', function(err, addedRestaurants){
            if(err){
                console.log(err);
            }
            //console.log(addedRestaurants);
        });
  });

  /*beforeEach(function(done) {
    // I do stuff like populating db
  });

  afterEach(function(done) {
    // I do stuff like deleting populated db
  });
  
  after(function() {
    db.close();
  });
  */
    describe('/GET Restaurants', () => {
        it('it should GET all the restaurants', (done) => {
            chai.request(server)
                .get('/api/restaurants')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('/GET/:id Restaurant', () => {
        it('it should GET a restaurant by the given id', (done) => {
            let restaurant = newRestaurants[0];
            chai.request(server)
                .get('/api/restaurant/' + restaurant._id)
                .send(restaurant)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    res.body.should.have.property('city');
                    res.body.should.have.property('state');
                    res.body.should.have.property('_id').eql(restaurant._id + '');
                    done();
                });
        });
    });

    describe('/POST Add Restaurant', () => {
    it('it should Add restaurant to database', (done) => {
        let restaurant = {
            name: "Taco Bell",
            description: "Fast food restaurant",
            city: "Atlanta",
            state: "Gerogia",
            cuisine: "Mexican",
            rating: 4
        }
        chai.request(server)
            .post('/api/restaurant')
            .send(restaurant)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body);
                done();
            });
        });
    });

    describe('/PUT Update Restaurant', () => {
    it('it should Add restaurant to database', (done) => {

        let restaurant = newRestaurants[0];
        chai.request(server)
            .put('/api/restaurant/' + restaurant._id)
            .send(restaurant)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body);
                res.body.should.have.property('ok');
                done();
            });
        });
    });

    describe('/DELETE Delete Restaurant', () => {
    it('it should Delete restaurant from database', (done) => {

        let restaurant = newRestaurants[2];

        chai.request(server)
            .delete('/api/restaurant/' + restaurant._id)
            .send(restaurant)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });

});