const route = require('../dependencies').Router();
const userLogic = require("../buissenessLogics/user.logic");

route.get('/user' , async (req , res)=>{
    let users = userLogic.user;
    let result_users = users;
    for(let i=0 ; i<result_users.length ; i++){
        delete result_users[i].password;
    }
    res.status(200).send({
        resuult:"success",
        users:result_users
    })
}) 

route.get('/user/:id', async (req, res) => {
    let users = userLogic.user;
    let id = req.params.id;
    console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const isPresent = users.some(user => user.id == id);
    console.log(isPresent);
    if (!isPresent) {
        res.status(404).send({
            result: "failure",
            users: users,
            id: id,
            message: "User with this id does not exist"
        });
        return;
    }
    let result = users.find(user => user.id == id)
    delete result.password
    console.log(result);
    res.status(200).send({
        result: "success",
        user:result,
        id: result.id,
    });
});

route.post('/user' , async (req , res)=>{
    let {login , password} = req.body;
    if(!login || !password){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide full information"
        })
    }
    let users = userLogic.user;
    const isPresent = users.some(user=> user.login === login)
    if(isPresent){
        res.status(403).send({
            resuult:"failure",
            message: "User with this login already exists"
        })
        return;
    }
    let new_id ;
    if(users.length == 0){
        new_id =1;
    }else{
        new_id = users[users.length-1].id + 1
    }
    console.log(new_id);
    let CreateUserDto = {
        login:login,password:password
    }
    users.push({
        id:new_id,
        login:login,
        password:password,
        version: 1, 
        createdAt: new Date(), 
    })

    res.status(201).send({
        resuult:"success",
        message:"User created successfully"
    })
    
})

route.put('/user/:id', async (req, res) => {
    let users = userLogic.user;
    let id = req.params.id;
    const {oldPassword , newPassword} = req.body;
    console.log(oldPassword);
    console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const isPresent = users.some(user => user.id == id);
    console.log(isPresent);
    if (!isPresent) {
        res.status(404).send({
            result: "failure",
            users: users,
            id: id,
            message: "User with this id does not exist"
        });
        return;
    }
    const index = users.findIndex(user => user.id == id);
    if(users[index].password === oldPassword){
        users[index].version = users[index].version+1;
        users[index].updatedAt = new Date();
        users[index].password = newPassword;
        let result_user = users[index]
        delete result_user.password;
            res.status(200).send({
            result:"success",
            user:result_user,
            message:"Updated Successfully"
        })
        return;
    }else{
        res.status(403).send({
            result:"failure",
            message:"Unauthorized"
        })
    }
});

route.delete('/user/:id', async (req, res) => {
    let users = userLogic.user;
    let id = req.params.id;
    console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = users.findIndex(user => user.id == id);
    console.log(index);
    if (index==-1) {
        res.status(404).send({
            result: "failure",
            message: "User with this id does not exist"
        });
        return;
    }
    users.splice(index , 1)
    res.status(200).send({
        result:"success",
        message:"Deleted Successfully"
    })
});
module.exports = route;