export default class Routes {
    
    constructor(){ }

    default(req: any, res: any) {
        res.render('index', {
          "title": app.name,
          "version": app.version
        });
    }

    user(req: any, res: any) {
        res.render('edit', {
            "title": app.name,
            "version": app.version,
            "page-status": "Draft",
            "page-date": moment().format("DD MMM YYYY"),
            "content": "Content",
            "user-status": "Logout",
            "user": req.user
        });
    }

    savePost(req: any, res: any) {
        var doc: Post = {
            title: req.body.post.title.value,
            content: req.body.post.content.value,
            postCreated : new Date(),
            postPublished: '',
            lastUpdated: new Date(),
            status: req.body.post.status,
            // Should get the current active user id
            author: '',
            tags: ['hello', 'world']
        };

        savePost(doc).then((result) => {
            compile(doc).then((status) => {
                var jsonOut = {
                    post: status,
                    id: result.generated_keys
                }
                res.json(jsonOut);
            }, (err) => {
                res.json({ error: err });
            })
        }, (err) => {
            res.json({ error: err });
        });
    }

    api(req: any, res: any){
      res.json({
        api: app.version,
        description: app.description
      })
    }

    listPosts(req: any, res: any) {
      res.json({
        process: 'list posts'
      });
    }

    getPost(req: any, res: any) {
      res.json({
        process: 'get post'
      });
    }

    updatePost(req: any, res: any) {
      res.json({
        process: 'update post'
      });
    }

    deletePost(req: any, res: any) {
      res.json({
        process: 'delete post'
      });
    }

    loginPage(req: any, res: any) {
      res.render('login', {
        title: app.name,
        version: app.version,
        message: req.flash('loginMessage')
      });
    }

    signupPage(req: any, res: any) {
      res.render('signup', {
        title: app.name,
        version: app.version,
        message: req.flash('signupMessage')
      });
    }

    logout(req, res) {
      req.logout();
      res.redirect('/');
    }
}
