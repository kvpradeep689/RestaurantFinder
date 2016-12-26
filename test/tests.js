var server = require('../server');
var should = require('should'),
    supertest = require('supertest');
var restaurantRoutes = require('../routes/restaurants');

function returnsName(name){
    return name;
}

describe('First Test case', function() {
    it('returns the name passed to the function', function(){
        returnsName('Pradeep').should.equal('Pradeep');
    });
});

//Note: Getting error "res.json is not a function" when its trying to get data in restaurants router.
//Need to handle that.
describe('GetAllRestaurants', function() {
    it('returns all the restaurants', function(done){
        supertest(restaurantRoutes)
        .get('/restaurants')
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            done();
        });
    });
});

/*describe('GetAllRestaurant', function() {
    it('returns all the restaurants', function(){
        restaurantRoutes['/restaurants'].get({}, {
            json: function(data) {
                expeect(data).to.equal([{"_id":"585e8ab0734d1d400d132a2f","name":"McDonalds","cuisine":"American","description":"Fast food chain","city":"Charleston","state":"South Carolina","rating":"5"},{"_id":"585e8ae8734d1d400d132a50","name":"Andolinis","description":"Pizza restaurant","city":"Charleston","state":"South Carolina","cuisine":"Italian","rating":3},{"_id":"58601712ce2f752f8ca3893c","name":"Taste Of Thai","description":"Good restaurant","city":"Charleston","state":"SC","cuisine":"Thai","rating":"5"},{"_id":"586025871678a239840f2c3f","name":"Taste Of India","description":"Indian type","city":"CHS","state":"SC","cuisine":"Indian","rating":"2"}]);
            }
        });
        request({
            method: 'get',
            url: 'http://localhost:3000/api/restaurants'
        }, function (error, respoonse, body) {
            expect(response.statusCode).to.equal(200);
        });
    });
});*/

/*describe('GetSingleRestaurant', function() {

});*/