'use strict';

var bodyparser= require('body-parser')
var User = require('../models/User.js')

module.exports=function loadUserRoutes(router, passport){
    router.use(bodyparser.json())
    router.get('/auth/google', passport.authenticate('google', {
        session: false,
        successRedirect: '/chat',
        failureRedirect: '/'
    }))
    router.get("/auth/google/callback", passport.authenticate('google', {
        session: false,
        successRedirect: '/chat',
        failureRedirect: '/'
    }))

    router.post('/sign_up', passport.authenticate('local-sign-up', {session: false}, function (req, res){
        res.json(req.user)
    }))

    router.post('/sign_in', passport.authenticate('local-login', {session: false}, function(req, res){
        res.json(req.user)
    }))
    router.get('/sign_out', function(req, res){
        req.logout()
        res.end()
    })
    router.get('/load_auth_into_state', function(req, res){
        res.json(req.user)
    })
    router.get('/all_usernames', function(req, res){
        User.find({'local.username': {$exists: true}}, {'local.username': 1, _id: 0}, function (err, data){
            if(err){
                console.log(err)
                return res.status(500).json({msg: "Internal Server Error In user_routes.js"})
            }
            res.json(data)
        })
    })
}
