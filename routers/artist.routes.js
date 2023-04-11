const route = require('../dependencies').Router();
const artistLogic = require("../buissenessLogics/artist.logic");

route.get('/artist' , async (req , res)=>{
    let artists = artistLogic.artist;
    res.status(200).send({
        resuult:"success",
        artists:artists
    })
}) 

route.get('/artist/:id', async (req, res) => {
    let artists = artistLogic.artist;
    let id = req.params.id;
    // console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = artists.findIndex(artist => artist.id == id)
    console.log(index);
    if (index == -1) {
        res.status(404).send({
            result: "failure",
            artists: artists,
            id: id,
            message: "artist with this id does not exist"
        });
        return;
    }
    res.status(200).send({
        result: "success",
        id: artists[index].id,
        artist : artists[index].artistName
    });
});

route.post('/artist' , async (req , res)=>{
    let artistName = req.body.artist;
    if(!artistName){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide full information"
        })
        return
    }
    let artists = artistLogic.artist;
    const index = artists.findIndex(artist => artist.artistName == artistName);
    if(index !== -1){
        res.status(403).send({
            resuult:"failure",
            message: "this artist already exists"
        })
        return;
    }
    let new_id ;
    if(artists.length == 0){
        new_id =1;
    }else{
        new_id = artists[artists.length-1].id + 1
    }
    console.log(new_id);
    artists.push({
        id:new_id,artistName:artistName
    })

    res.status(201).send({
        resuult:"success",
        message:"artist created successfully"
    })
    
})

route.put('/artist/:id', async (req, res) => {
    let artists = artistLogic.artist;
    let id = req.params.id;
    const newartist = req.body;
    // console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = artists.findIndex(artist => artist.id == id);
    console.log(index);
    if (index==-1) {
        res.status(404).send({
            result: "failure",
            message: "artist with this id does not exist"
        });
        return;
    }
    let artistName = req.body.artist;
    if(!artistName){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide full information"
        })
        return
    }
    
    console.log(newartist);
    artists[index].artistName = newartist.artist;
    res.status(200).send({
        result:"success",
        message:"Updated Successfully"
    })
});

route.delete('/artist/:id', async (req, res) => {
    let artists = artistLogic.artist;
    let id = req.params.id;
    console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = artists.findIndex(artist => artist.id == id);
    console.log(index);
    if (index==-1) {
        res.status(404).send({
            result: "failure",
            message: "artist with this id does not exist"
        });
        return;
    }
    artists.splice(index , 1)
    res.status(200).send({
        result:"success",
        message:"Deleted Successfully"
    })
});
module.exports = route;