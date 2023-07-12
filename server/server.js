let express = require("express")
let mongoose = require("mongoose")
let app = express()
let dotenv = require("dotenv")
let userRoutes = require('./routes/userRoutes')
let messageRoutes = require("./routes/messageRoutes")
const { Server } = require("socket.io");
let Notification= require('./models/notificationModel')
let notificationRoutes= require('./routes/notificationRoutes')
dotenv.config()
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log("Connected with the database")
}).catch((error) => {
  console.log(error.message)
})
app.use(express.json())
app.use("/api", userRoutes)
app.use('/api', messageRoutes)
app.use('/api', notificationRoutes)
let server = app.listen(process.env.PORT, () => {
  console.log(`server is running at port: ${process.env.PORT}`)
})
let activeUsers = []
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});
io.on("connection", (socket) => {
  try {
    socket.on("addUser", (userId) => {
      const existingUser = activeUsers.find((user) => user.userId === userId);
      if (!existingUser) {
        activeUsers.push({ userId, socketId: socket.id });
      }
      io.emit("getUsers", activeUsers);
    });
    socket.on("newMessage", async ({ message, sender, receiver }) => {
      const isReceiverOnline = activeUsers.find((user) => user.userId === receiver);
      if (isReceiverOnline) {
        io.to(isReceiverOnline.socketId).emit("receiveMessage", { message, sender, receiver });
      }
      else{
        let notification= await new Notification({sender,receiver,message})
        notification.save()
      }
    });
    
    socket.on("disconnect", () => {
      const updatedUsers = activeUsers.filter(
        (user) => user.socketId !== socket.id
      );
      activeUsers=updatedUsers
      io.emit("getUsers", activeUsers);
    });
  } catch (error) {
    console.log(error)
  }
}); 