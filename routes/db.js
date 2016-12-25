//Used to interact with mongodb
var mongojs = require('mongojs');
var url = 'mongodb://pradeep:pradeep@ds145138.mlab.com:45138/restaurants_pradeep';
//var collections = ['restaurants'];
//var db = mongojs(url, collections);
var db = null;

var state = {
  db: null,
}

//Connect once and use the same connection
exports.connect = function() {
  console.log('Opening Db Connection...')
  if (state.db) return;

  db = mongojs(url);
  if(db){
    state.db = db
  }
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}

//Get all documents of a collection
exports.getCollection = function(collection, func) {
    console.log('DBAccessLayer: getCollection on ' + collection);
    return  db.collection(collection).find(function(err, documents){
            func(err, documents);
        });
};

//Get one document of a collection
exports.getDocumentInCollection = function(collection, id, func) {
    console.log('DBAccessLayer: getDocumentInCollection on ' + id);
    return  db.collection(collection).findOne({_id: mongojs.ObjectId(id)}, function(err, document){
        func(err, document);
    });
};

//Add document to collection
exports.addDocument = function(collection, document, func) {
    console.log('DBAccessLayer: addDocument on ' + collection + ' collection ');
    return  db.collection(collection).save(document, function(err, doc){
            func(err, doc);
      });
};

//Update document to collection
exports.updateDocument = function(collection, document, id, func) {
    console.log('DBAccessLayer: addDocument on ' + collection + ' collection ' + id);
    return  db.collection(collection).update({_id: mongojs.ObjectId(id)}, document, {}, function(err, doc){
            func(err, doc);
      });
};

//Delete document to collection
exports.deleteDocument = function(collection, id, func) {
    console.log('DBAccessLayer: deleteDocument on ' + collection + ' collection ' + id);
    return  db.collection(collection).remove({_id: mongojs.ObjectId(id)}, function(err, doc){
            func(err, doc);
      });
};