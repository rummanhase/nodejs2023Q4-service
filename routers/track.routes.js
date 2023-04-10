const route = require('../dependencies').Router();
const trackLogic = require("../buissenessLogics/track.logic");

route.get('/track' , async (req , res)=>{
    let tracks = trackLogic.track;
    res.status(200).send({
        resuult:"success",
        tracks:tracks
    })
}) 

route.get('/track/:id', async (req, res) => {
    let tracks = trackLogic.track;
    let id = req.params.id;
    // console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const isPresent = tracks.some(track => track.id == id);
    console.log(isPresent);
    if (!isPresent) {
        res.status(404).send({
            result: "failure",
            tracks: tracks,
            id: id,
            message: "track with this id does not exist"
        });
        return;
    }
    let result = tracks.find(track => track.id == id)
    console.log(result);
    res.status(200).send({
        result: "success",
        id: result.id,
        track : result.trackName
    });
});

route.post('/track' , async (req , res)=>{
    let trackName = req.body.track;
    if(!trackName){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide full information"
        })
        return
    }
    let tracks = trackLogic.track;
    const isPresent = tracks.some(track=> track.track === trackName)
    if(isPresent){
        res.status(403).send({
            resuult:"failure",
            message: "this track already exists"
        })
        return;
    }
    let new_id ;
    if(tracks.length == 0){
        new_id =1;
    }else{
        new_id = tracks[tracks.length-1].id + 1
    }
    console.log(new_id);
    tracks.push({
        id:new_id,trackName:trackName
    })

    res.status(201).send({
        resuult:"success",
        message:"track created successfully"
    })
    
})

route.put('/track/:id', async (req, res) => {
    let tracks = trackLogic.track;
    let id = req.params.id;
    const newTrack = req.body;
    // console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = tracks.findIndex(track => track.id == id);
    console.log(index);
    if (index==-1) {
        res.status(404).send({
            result: "failure",
            message: "track with this id does not exist"
        });
        return;
    }
    console.log(newTrack);
    tracks[index].trackName = newTrack.track;
    res.status(200).send({
        result:"success",
        message:"Deleted Successfully"
    })
});

route.delete('/track/:id', async (req, res) => {
    let tracks = trackLogic.track;
    let id = req.params.id;
    console.log(id);
    if (!id || isNaN(id)) {
        res.status(400).send({
            result: "failure",
            message: "Not a valid UUID"
        });
        return;
    }
    const index = tracks.findIndex(track => track.id == id);
    console.log(index);
    if (index==-1) {
        res.status(404).send({
            result: "failure",
            message: "track with this id does not exist"
        });
        return;
    }
    tracks.splice(index , 1)
    res.status(200).send({
        result:"success",
        message:"Deleted Successfully"
    })
});
module.exports = route;