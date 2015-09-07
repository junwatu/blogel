'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var util = require('util');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });

    let localSignupStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {

        process.nextTick(() => {
            User.findOne({ localEmail: email }, (err, user) => {
                if (err) return done(err);
                if (user) {
                    console.log('user is exist');
                    return done(null, false, req.flash('signupMessage', 'Email is already registered!'));
                } else {
                    let params = {
                        localEmail: email,
                        localPassword: password
                    };
                    let newUser = new User(params);

                    newUser.save((err, result) => {
                        if (err) throw err;
                        params.id = result._id;
                        return done(null, params);
                    });
                }
            });
        })
    });

    passport.use('local-signup', localSignupStrategy);

    let optionsLocal = {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    };

    let localLoginStrategy = new LocalStrategy(optionsLocal, (req, email, password, done) => {
            User.findOne({ localEmail: email }, (err, user) => {
                if (err) return done(err);
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found!'));
                } else {
                    User.validPassword(password, user, (err, val) => {
                        if (err) console.log(err);
                        if (!val) return done(null, false, req.flash('loginMessage', "Oops! Wrong password!"));
                        let loggedinUser = {
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
