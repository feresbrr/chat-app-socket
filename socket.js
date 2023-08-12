const { Server } = require("socket.io");
const dotenv = require('dotenv').config()
const port = process.env.port
const io = new Server(Number(port), {
  cors: {
    origin: "*",
  },
});
console.log("socket running on port", port);
let clients = [];
io.on("connection", (socket) => {
  socket.on("CONNECT", (data) => {
    const clientCheck = clients.find((client) => client?._id === data?._id);
    if (!clientCheck) {
      clients.push(
        data
      )
    }
  });
  socket.on("MESSAGE",(data,cb)=>{
    const user = clients.find((client)=>client?._id === data?.usertodm?._id);
    if (user){
      io.to(user?.socketID).emit("MESSAGE",data?.message);
    }
    cb()
  })
});


