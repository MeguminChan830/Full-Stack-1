var GoogleStrategy = require('passport-google').Strategy
var LocalStrategy = require('passport-local').Strategy
var User = require('../src/server/models/User')
var cookies = require('react-cookie')
var host = process.env.NODE_ENV !== 'production' ? "localhost:3000" : 'stackclone.herokuapp.com'
if (process.env.NODE_ENV !== 'production') {
    var oAuthConfig = require('./oAuthConfig.dev')
}
module.exports = function (passport) {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            User.findOne({ 'local.username': username }, function (err, user) {
                if (err) {
                    return done(err)
                }
                if (user) {
                    return done(null, false)
                } else {
                    var newUser = new User()
                    newUser.local.username = username
                    newUser.local.password = newUser.generateHash(password)
                    newUser.save(function (err, user) {
                        if (err) {
                            throw err
                        }
                        return done(null, newUser)
                    })
                }
            })
        }
    ))
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passRedCallback: true
    },
        function (req, username, password, done) {
            User.findOne({ 'local.username': username }, function (err, user) {
                if (err) throw err
                if (!user) return done(null, false)
                if (!user.validPassword(password)) return done(null, false)
                return done(null, user)
            })
        }
    ))
    passport.use(new GoogleStrategy({
        clientID: oAuthConfig.google.clientID,
        clientSecret: oAuthConfig.google.clientSecret,
        callbackURL: 'http://' + host + '/api/auth/google/callback'
    },
        function (accessToken, refreshToken, profile, done) {
            cookies.save('username', profile.displayName)
            User.findOne({ "google.id": profile.id }, function (err, user) {
                if (err) console.log(err)
                if (!err && user !== null) done(null, user)
                else {
                    var newUser = new User({ 'google.id': profile.id, 'google.username': profile.displayName })
                    newUser.save(function (err, user) {
                        if (err) console.log(err)
                        else done(null, user)
                    })
                }
            })
        }
    ))
}