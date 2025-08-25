const express = require("express"); // http request
const bodyParser = require("body-parser");
const cors = require("cors");
const mainRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// CORS configuration
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use("/api/v1", mainRouter);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`CORS enabled for: ${FRONTEND_URL}`);
});

//Socket Logic
const rooms = {};

const io = require("socket.io")(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connencted to Socket.io");

  socket.on("joinRoom", (roomId, name, isOwner) => {
    socket.join(roomId);

    console.log(`User ${name} joined room ${roomId} and isOwner = ${isOwner}`);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push({ name, isOwner, id: socket.id });

    io.to(roomId).emit("updateUserList", rooms[roomId]);
  });

  socket.on("drawing", (roomId, elements) => {
    io.to(roomId).emit("drawing", elements);
  });

  socket.on("joinChat", (roomId, name) => {
    const socketRoomId = "chat" + roomId;
    socket.join(socketRoomId);
    console.log(`chats -----User ${name} joined room ${socketRoomId}-----`);
  });

  socket.on("chatMessage", (roomId, name, message) => {
    const socketRoomId = "chat" + roomId;
    io.to(socketRoomId).emit("chatMessage", { name: name, message });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected = " + socket.id);

    // Remove user from the list of connected users for the room
    for (const roomId in rooms) {
      const index = rooms[roomId].findIndex((user) => user.id === socket.id);
      if (index !== -1) {
        rooms[roomId].splice(index, 1);

        io.to(roomId).emit("updateUserList", rooms[roomId]);

        if (rooms[roomId].length === 0) {
          delete rooms[roomId];
        }

        break;
      }
    }
  });
});
