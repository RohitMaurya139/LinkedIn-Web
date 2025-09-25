
import { io, userSocketMap } from "../index.js";
import Connection from "../models/connectionModel.js";
import User from "../models/userModel.js";
export const sendConnection = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.userId;

    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "You cannot send connection request to yourself." });
    }

    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: "Sender user not found." });
    }

    // Assuming user.connection is array of ObjectIds
    if (sender.connection.some((connId) => connId.toString() === receiverId)) {
      return res.status(409).json({ message: "You are already connected." });
    }

    const existingConnection = await Connection.findOne({
      $or: [
        { sender: senderId, receiver: receiverId, status: "pending" },
        { sender: receiverId, receiver: senderId, status: "pending" },
      ],
    });

    if (existingConnection) {
      return res
        .status(409)
        .json({ message: "A pending connection request already exists." });
    }

    const newConnection = await Connection.create({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });
     const receiverSocketId = userSocketMap.get(receiverId);
    const senderSocketId = userSocketMap.get(senderId)
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("statusUpdate",{updateUserId:senderId,newStatus:"receiver" })
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("statusUpdate", {
        updateUserId: receiverId,
        newStatus: "pending",
      });
    }
    return res
      .status(200)
      .json({
        message: "Connection request sent successfully.",
        data: newConnection,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};


export const acceptConnection = async (req, res) => {
  try {
    const { connectionId } = req.params;

    const connection = await Connection.findById(connectionId).populate(
      "sender receiver"
    );
    if (!connection) {
      return res.status(404).json({ message: "Connection does not exist" });
    }
    if (connection.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    // Update status to 'accepted'
    connection.status = "accepted";
    await connection.save();

    // Add each other to connections using $addToSet to avoid duplicates
    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { connection: connection.sender._id },
    });
    await User.findByIdAndUpdate(connection.sender._id, {
      $addToSet: { connection: req.userId },
    });

    // Retrieve socket IDs
    const receiverSocketId = userSocketMap.get(
      connection.receiver._id.toString()
    );
    const senderSocketId = userSocketMap.get(connection.sender._id.toString());

    // Emit updates to both parties if connected
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("statusUpdate", {
        updateUserId: connection.sender._id,
        newStatus: "disconnect",
      });
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("statusUpdate", {
        updateUserId: req.userId,
        newStatus: "disconnect",
      });
    }

    // Return response at the end (not inside if-block)
    return res.status(200).json({
      message: "Connection request accepted",
      data: connection,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};



export const rejectConnection = async (req, res) => {
  try {
    const { connectionId } = req.params;

    const connection = await Connection.findById(connectionId);
    if (!connection) {
      return res.status(404).json({ message: "Connection does not exist" });
    }
    if (connection.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    // Update status to 'rejected'
    connection.status = "rejected";
    await connection.save();
    // Retrieve socket IDs
    const receiverSocketId = userSocketMap.get(otherUserId);
    const senderSocketId = userSocketMap.get(myId);

    // Emit updates to both parties if connected
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("statusUpdate", {
        updateUserId: myId,
        newStatus: "connect",
      });
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("statusUpdate", {
        updateUserId: otherUserId,
        newStatus: "connect",
      });
    }
    return res.status(200).json({
      message: "Connection request rejected",
      data: connection,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getConnectionStatus = async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    const currentUserId = req.userId;

    const currentUser = await User.findById(currentUserId);

    if (
      currentUser.connection.some(
        (connId) => connId.toString() === targetUserId.toString()
      )
    ) {
      return res.json({ status: "disconnect" }); // or "disconnect" if your UI expects that
    }

    const pendingRequest = await Connection.findOne({
      $and: [
        {
          $or: [
            { sender: currentUserId, receiver: targetUserId },
            { sender: targetUserId, receiver: currentUserId },
          ],
        },
        { status: "pending" },
      ],
    });

    if (pendingRequest) {
      if (pendingRequest.sender.toString() === currentUserId.toString()) {
        return res.json({ status: "pending" });
      } else {
        return res.json({ status: "received", requestId: pendingRequest._id });
      }
    }

    return res.json({ status: "Connect" });
  } catch (error) {
    return res.status(500).json({
      message: "GetConnectionStatus Error",
      error: error.message,
    });
  }
};
export const removeConnection = async (req, res) => {
  try {
    const myId = req.userId;
    const otherUserId = req.params.userId;

    // Remove other user from my connections
    await User.findByIdAndUpdate(myId, {
      $pull: { connection: otherUserId },
    });

    // Remove myself from other user's connections
    await User.findByIdAndUpdate(otherUserId, {
      $pull: { connection: myId },
    });

    return res.status(200).json({ message: "Connection removed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "removeConnection Error", error: error.message });
  }
};


export const getConnectionRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const request = await Connection.find({
      receiver: userId,
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .populate(
        "sender",
        "FirstName LastName UserName Email ProfilePic headline"
      );

    return res.status(200).json({
      message: "Connection requests fetched successfully",
      data: request,
    });
  } catch (error) {
    return res.status(500).json({
      message: "getConnectionRequest Error",
      error: error.message,
    });
  }
};


export const getUserConnection = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate(
      "connection",
      "FirstName LastName UserName connection ProfilePic headline"
    );

    return res.status(200).json({
      message: "User connections fetched successfully",
      data: user.connection,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "getUserConnection Error", error: error.message });
  }
};




