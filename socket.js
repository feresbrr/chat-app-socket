const { Server } = require("socket.io");
const io = new Server(Number(3005), {
  cors: {
    origin: "*",
  },
});
console.log("socket running on port", 3005);
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


