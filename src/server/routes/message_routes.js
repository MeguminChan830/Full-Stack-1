var Message = require('../models/Message')
var bodyparser = require('body-parser')
module.exports= function (router){
    router.use(bodyparser.json())
    router.get('/messages', function(req, res){
        Message.find({}, {id: 1, channelID: 1, text: 1, user: 1, time: 1, _id: 0}, function (err, data){
            if(err){
                console.log(err)
                return res.status(500).json({msg: "Internal error in message_routes.js"})
            }
            res.json()
        })
    })
    router.get('/messages/:channel', function(req, res){
        Message.find({channelID: req.params.channel}, {id: 1, channelID: 1, text: 1, user: 1, time: 1, _id: 0}, function (err, data){
            if(err){
                console.log(err)
                res.status(500).json({msg: "Internal error message_routes"})
            }
            res.json(data)
        })
    })
    router.post('/new_message', function(req, res){
        var newMessage= new Message(req.body)
        newMessage.save(function(err, data){
            if(err){
                console.log(err)
                res.status(500).json({msg: "error in message"})
            }
            res.json(data)
        })
    })
}