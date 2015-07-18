/**
* Passport Auth
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
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

    /**+++++++++++
     *   SignUp
     *++++++++++++
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

    /**++++++++++
     *   Login
     *+++++++++++
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
