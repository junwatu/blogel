var db = require('../server/db.js');
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

var post_update = {
    title: 'LRC Network',
    content: 'Inductor, Resisto & Capacitor Network',
    //postCreated : new Date(),
    postPublished: new Date(),
    lastUpdated: '22-07-2015',
    status: 'published',
    // should be author id: string
    author: 'Maheso Anabrang',
    tags: ['hello', 'dummy', 'electronic']
}

var post_id;

describe('Blogel Database Test', function(){

    it('Should save new post', function(done){
       db.savePost(post).then(function(status){
	       post_id = status.generated_keys[0]
	       done()
       }, function(err){
         done(err)
       });
    })

    it('Should get post data base on id', function(done){
       db.getPostById(post_id).then(function(data){
	       assert.equal(data.title,post.title, 'post title should be '+post.title);
	       done()
       }, function(err){
         done(err)
       });
    });

    it('Should update post', function(){
       post_update.generated_keys = [post_id];
       db.updateThePost(post_update).then(function(data){
         assert.equal(1, data.replaced, 'replaced (updated) should be 1')
	       done()
       }, function(err){
         done(err)
       });
    })
    
    it('Should get all post', function() {
      db.getAllPost().then(function(data) {
        assert.equal('draft', data[0].status, 'status should be draft')
        done()
      }, function(err) {
        done(err)
      })
    })

    it('Should delete post with specified id', function(done){
       db.deletePost(post_id).then(function(result){
	        assert.equal(1, result.deleted, 'deleted should be 1')
	        done()
       }, function(err){
           done(err)
       })
    })
})
