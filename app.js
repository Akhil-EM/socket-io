const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server,{cors:{origin:"*"}});
const path = require("path");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', require('ejs').__express);
app.set("view engine", "ejs");

app.get("/home",(req,res)=>{
    res.render('home.ejs');
})


io.on('connection',(socket)=>{
    console.log("new connection",socket.id);

    socket.on("message",(data)=>{
        socket.broadcast.emit('message',data)
        
    })
});




server.listen(3001,()=>console.log("application running on 3001..."));

