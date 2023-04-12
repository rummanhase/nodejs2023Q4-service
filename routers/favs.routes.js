const route = require('../dependencies').Router();
const favourites = require("../buissenessLogics/favs.logic");
const tracksLogic = require("../buissenessLogics/track.logic");
const albumsLogic = require("../buissenessLogics/album.logic");
const artistsLogic = require("../buissenessLogics/artist.logic");

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
    const index = tracks.findIndex(fav => fav.id == id);

    if(index == -1){
        res.status(403).send({
            resuult:"failure",
            message: "this track is not present in your trackjlist"
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

route.delete('/favs/track/:id' , async (req , res)=>{
    let id = req.params.id
    if(!id){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide id"
        })
        return
    }
    let favsTracks = favourites.tracks;
    const index = favsTracks.findIndex(fav => fav.id == id);

    if(index == -1){
        res.status(403).send({
            resuult:"failure",
            message: "this track is not present in your favourites"
        })
        return;
    }else{
        favourites.tracks = favourites.tracks.filter(track => track.id != id)
        console.log(favourites);
        res.status(201).send({
            result:"success",
            message:"track deleted succesfully"
        })
    }
})


route.post('/favs/album/:id' , async (req , res)=>{
    let id = req.params.id
    if(!id){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide id"
        })
        return
    }
    let favs = favourites;
    const albums = albumsLogic.album;
    const index = albums.findIndex(fav => fav.id == id);

    if(index == -1){
        res.status(403).send({
            resuult:"failure",
            message: "this album is not present in your albumjlist"
        })
        return;
    }else{
        let album_add = albums[index]
        favs.albums.push(album_add);
        res.status(201).send({
            result:"success",
            message:"albums updated succesfully"
        })
    }
})

route.delete('/favs/album/:id' , async (req , res)=>{
    let id = req.params.id
    if(!id){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide id"
        })
        return
    }
    let favsalbums = favourites.albums;
    const index = favsalbums.findIndex(fav => fav.id == id);

    if(index == -1){
        res.status(403).send({
            resuult:"failure",
            message: "this album is not present in your favourites"
        })
        return;
    }else{
        favourites.albums = favourites.albums.filter(album => album.id != id)
        console.log(favourites);
        res.status(201).send({
            result:"success",
            message:"album deleted succesfully"
        })
    }
})

route.post('/favs/artist/:id' , async (req , res)=>{
    let id = req.params.id
    if(!id){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide id"
        })
        return
    }
    let favs = favourites;
    const artists = artistsLogic.artist;
    const index = artists.findIndex(fav => fav.id == id);

    if(index == -1){
        res.status(403).send({
            resuult:"failure",
            message: "this artist is not present in your artistlist"
        })
        return;
    }else{
        let artist_add = artists[index]
        favs.artists.push(artist_add);
        res.status(201).send({
            result:"success",
            message:"artists updated succesfully"
        })
    }
})

route.delete('/favs/artist/:id' , async (req , res)=>{
    let id = req.params.id
    if(!id){
        res.status(400).send({
            resuult:"failure",
            message: "Please provide id"
        })
        return
    }
    let favsartists = favourites.artists;
    const index = favsartists.findIndex(fav => fav.id == id);

    if(index == -1){
        res.status(403).send({
            resuult:"failure",
            message: "this artist is not present in your favourites"
        })
        return;
    }else{
        favourites.artists = favourites.artists.filter(artist => artist.id != id)
        console.log(favourites);
        res.status(201).send({
            result:"success",
            message:"artist deleted succesfully"
        })
    }
})
module.exports = route;