const express = require('./dependencies');
const userRoute = require('./routers/user.routes');
const trackRoute = require('./routers/track.routes');
const PORT = 4000;

const app = express();
app.use(express.json());


app.use("/" , userRoute);
app.use("/" , trackRoute)

app.listen( PORT, ()=>{
    console.log("App is listening at "+PORT);
})