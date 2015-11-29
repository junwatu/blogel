var db = require('../server/db.js');
var assert = require('assert');

var author = {
    name: 'Slash',
    email: 'email@me.com',
 };

var author_update = {
    name: 'Morbid',
    email: 'morbid@angel.org',
}

var author_id;

describe('Author Table Test', function(){

    it('Should save new author', function(done){
       db.saveAuthor(author).then(function(status){
	         author_id = status.generated_keys[0];
	         done();
       }, function(err){
           done(err);
       });
    })

    it('Should get author data based on id', function(done){
       db.getAuthorById(author_id).then(function(data) {
          assert.equal(data.name,author.name, 'Author name ');
	        done();
       }, function(err){
          done(err);
       });
    });

    it('Should update author data', function(){
       author_update.generated_keys = [author_id];
           db.updateAuthor(author_update).then(function(data){
           assert.equal(1, data.replaced, 'replaced (updated) should be 1');
	         done();
       }, function(err){
           done(err);
       });
    })

    it('Should delete author with specified id', function(done){
       db.deleteAuthor(author_id).then(function(result){
	       assert.equal(1, result.deleted, 'deleted should be 1');
	       done();
       }, function(err){
           done(err);
       })
    })
})
