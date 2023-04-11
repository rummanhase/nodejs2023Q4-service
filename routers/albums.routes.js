const route = require('../dependencies').Router();
const albumLogic = require("../buissenessLogics/album.logic");

route.get('/album' , async (req , res)=>{
    let albums = albumLogic.album;
    res.status(200).send({
        resuult:"success",
        albums:albums
    })
}) 

route.get('/album/:id', async (req, res) => {
    let albums = albumLogic.album;
    let id = req.params.id;
    // console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = albums.findIndex(album => album.id == id)
    console.log(index);
    if (index == -1) {
        res.status(404).send({
            result: "failure",
            message: "album with this id does not exist"
        });
        return;
    }
    res.status(200).send({
        result: "success",
        id: albums[index].id,
        album : albums[index].albumName
    });
});

route.post('/album' , async (req , res)=>{
    let albumName = req.body.album;
    if(!albumName){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide full information"
        })
        return
    }
    let albums = albumLogic.album;
    const index = albums.findIndex(album => album.albumName == albumName);
    if(index !== -1){
        res.status(403).send({
            resuult:"failure",
            message: "this album already exists"
        })
        return;
    }
    let new_id ;
    if(albums.length == 0){
        new_id =1;
    }else{
        new_id = albums[albums.length-1].id + 1
    }
    console.log(new_id);
    albums.push({
        id:new_id,albumName:albumName
    })

    res.status(201).send({
        resuult:"success",
        message:"album created successfully"
    })
    
})

route.put('/album/:id', async (req, res) => {
    let albums = albumLogic.album;
    let id = req.params.id;
    const newalbum = req.body;
    // console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = albums.findIndex(album => album.id == id);
    console.log(index);
    if (index==-1) {
        res.status(404).send({
            result: "failure",
            message: "album with this id does not exist"
        });
        return;
    }
    let albumName = req.body.album;
    if(!albumName){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide full information"
        })
        return
    }
    
    console.log(newalbum);
    albums[index].albumName = newalbum.album;
    res.status(200).send({
        result:"success",
        message:"Updated Successfully"
    })
});

route.delete('/album/:id', async (req, res) => {
    let albums = albumLogic.album;
    let id = req.params.id;
    console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = albums.findIndex(album => album.id == id);
    console.log(index);
    if (index==-1) {
        res.status(404).send({
            result: "failure",
            message: "album with this id does not exist"
        });
        return;
    }
    albums.splice(index , 1)
    res.status(200).send({
        result:"success",
        message:"Deleted Successfully"
    })
});
module.exports = route;