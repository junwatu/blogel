// Author Test File
var db = require('../tmp/db.js');
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
           //console.log(status);
	   author_id = status.generated_keys[0];
	   done();    
       }, function(err){     
           done(err);
       });
    })
/*
    it('Should get post data base on id', function(done){
       db.getPostById(post_id).then(function(data){
	  //console.log('Get Post:');
          //console.log(data);
          assert.equal(data.title,post.title, 'post title should be '+post.title);
	  done();
       }, function(err){
          done(err);
       });   
    });

    it('Should update post', function(){
       
       post_update.generated_keys = [post_id];

       db.updatePost(post_update).then(function(data){
           //console.log(data);
           assert.equal(1, data.replaced, 'replaced (updated) should be 1');
	   done();
       }, function(err){
           done(err);
       });
    })
*/

    it('Should delete author with specified id', function(done){
       db.deleteAuthor(author_id).then(function(result){
           //console.log(result);
	   assert.equal(1, result.deleted, 'deleted should be 1');
	   done();
       }, function(err){
           done(err);
       })
    })
})
