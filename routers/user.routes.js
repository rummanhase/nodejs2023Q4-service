const route = require('../dependencies').Router();

let user = []

route.get('/user' , async (req , res)=>{
    res.send("user working");
})
module.exports = route;