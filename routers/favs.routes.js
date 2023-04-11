const route = require('../dependencies').Router();
const favourites = require("../buissenessLogics/favs.logic");
const tracksLogic = require("../buissenessLogics/track.logic");
const albumLogic = require("../buissenessLogics/album.logic");
const artistLogic = require("../buissenessLogics/artist.logic");

route.get('/favs' , async (req , res)=>{
    let favs = favourites;
    res.status(200).send({
        resuult:"success",
        favs:favs
    })
}) 

route.post('/favs/track/:id' , async (req , res)=>{
    let id = req.params.id
    if(!id){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide id"
        })
        return
    }
    let favs = favourites;
    const tracks = tracksLogic.track;
    console.log(tracks);
    console.log(favs.tracks);
    const index = tracks.findIndex(fav => fav.id == id);
    
    console.log(tracks[index]);
    if(index !== -1){
        res.status(403).send({
            resuult:"failure",
            message: "this fav already exists"
        })
        return;
    }else{
        let track_add = tracks[index]
        favs.tracks.push(track_add);
        res.status(201).send({
            track_add,
            tracks,
            result:"success",
            message:"tracks updated succesfully"
        })
    }
})

route.put('/favs/:id', async (req, res) => {
    let favs = favourites;
    let id = req.params.id;
    const newfav = req.body;
    // console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = favs.findIndex(fav => fav.id == id);
    console.log(index);
    if (index==-1) {
        res.status(404).send({
            result: "failure",
            message: "fav with this id does not exist"
        });
        return;
    }
    let favName = req.body.fav;
    if(!favName){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide full information"
        })
        return
    }
    
    console.log(newfav);
    favs[index].favName = newfav.fav;
    res.status(200).send({
        result:"success",
        message:"Updated Successfully"
    })
});

route.delete('/favs/:id', async (req, res) => {
    let favs = favourites;
    let id = req.params.id;
    console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = favs.findIndex(fav => fav.id == id);
    console.log(index);
    if (index==-1) {
        res.status(404).send({
            result: "failure",
            message: "fav with this id does not exist"
        });
        return;
    }
    favs.splice(index , 1)
    res.status(200).send({
        result:"success",
        message:"Deleted Successfully"
    })
});
module.exports = route;