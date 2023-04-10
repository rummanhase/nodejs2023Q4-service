const express = require('./dependencies');
const userRoute = require('./routers/user.routes')

const app = express();
app.use(express.json());


app.use("/" , userRoute);

app.listen(4000 , ()=>{
    console.log("App is listening at 4000");
})