/**++++++++++++++++++
*  Passport Auth
* +++++++++++++++++++
*
*
The MIT License (MIT)

Copyright (c) 2014 Equan Pr.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/
var LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/user'),
    util = require('util');


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        })
    });

    /**
     *   SignUp
     */
    var localSignupStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {

        process.nextTick(function() {

            User.findOne({
                localEmail: email
            }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    console.log('user is exist');

                    return done(null, false, req.flash('signupMessage', 'Email is already registered!'));

                } else {

                    var params = {
                        localEmail: email,
                        localPassword: password
                    },
                        newUser = new User(params);

                    newUser.save(function(err, result) {
                        if (err) throw err;
                        params.id = result._id;
                        return done(null, params);
                    });
                }
            });
        })
    });

    passport.use('local-signup', localSignupStrategy);

    /**
     *   Login
     */

    var localLoginStrategy = new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        function(req, email, password, done) {
            User.findOne({
                localEmail: email
            }, function(err, user) {

                if (err) return done(err);
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found!'));
                } else {
                    User.validPassword(password, user, function(err, val) {
                       
                        if (err) console.log(err);
                        if (!val) return done(null, false, req.flash('loginMessage', "Oops! Wrong password!"));

                        var loggedinUser = {
                            localEmail: user[0].localEmail,
                            localPassword: user[0].localPassword,
                            id : user[0]._id
                        }
                        return done(null, loggedinUser);
                    })
                }
            });
        });

    passport.use('local-login', localLoginStrategy);
}
