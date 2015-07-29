// Test File
var db = require('../tmp/db.js');
var assert = require('assert');

var post = {
    title: 'LRC Network',
    content: 'Hello, World!',
    postCreated : new Date(),
    postPublished: '',
    lastUpdated: '22-07-2015', 
    status: 'draft',
    // should be author id: string
    author: 'Maheso Anabrang',
    tags: ['hello', 'dummy']
};

var post_id;

describe('Database Test', function(){

    it('Should save new post', function(done){
       db.savePost(post).then(function(status){
           //console.log(status);
	   post_id = status.generated_keys[0];
	   done();    
       }, function(err){     
           done(err);
       });
    })

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
})
