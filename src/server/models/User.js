var hash = require('bcrypt-nodejs')
var mongoose = require('mongoose')
var UserSchema= mongoose.Schema({
    local:{
        username: {type: String, unique: true},
        password: String,
        email: String
    },
    google: {
        id: String,
        username: String,
        token: String,
        email: String
    }
})
UserSchema.methods.generateHash= function(password){
    return hash.hashSync(password, hash.genSaltSync(8), null)
}
UserSchema.methods.validPassword=function(password){
    return hash.compareSync(password, this.local.password)
}
module.exports= mongoose.model("User", UserSchema)