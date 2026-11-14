import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "mongoose";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

db.connect(process.env.URL_DB)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.error(e));

// class error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// schema template
const topicSchema = new db.Schema(
  {
    name: {
      type: String,
      required: [true, "The topic name must be filled in"],
    },
  },
  { timestamps: true },
);
const Topic = db.model("Topic", topicSchema);

const messageSchema = new db.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    topic: {
      type: db.Schema.Types.ObjectId,
      ref: "Topic",
      required: [true, "Topic is required"],
    },
  },
  { timestamps: true },
);
const Message = db.model("Message", messageSchema);

// topic
app
  .route("/v1/api/topic")
  .get(async (req, res, next) => {
    try {
      const dataTopics = await Topic.find();

      return res.status(200).json(dataTopics);
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name } = req.body;

      const uniqueName = await Topic.findOne({ name });
      if (uniqueName) throw new AppError("This topic already exists", 409);

      const createTopic = await Topic.create({ name });

      return res.status(201).json({ message: "The topic was successfully created", data: createTopic });
    } catch (e) {
      next(e);
    }
  });
app.delete("/v1/api/topic/:id", async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const [topicUsed, findTopic] = await Promise.all([Message.countDocuments({ topic: reqId }), Topic.findById(reqId)]);

    if (!findTopic) throw new AppError("Topic not found", 404);
    if (topicUsed > 0) throw new AppError(`This topic has been used in ${topicUsed} messages`, 409);

    const deleteTopic = await Topic.findByIdAndDelete(reqId);

    return res.status(200).json({ message: "The topic was successfully deleted", data: deleteTopic });
  } catch (e) {
    next(e);
  }
});

// message
app
  .route("/v1/api/message")
  .get(async (req, res, next) => {
    try {
      const dataMessages = await Message.find().populate("topic", "name");

      return res.status(200).json(dataMessages);
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, message, topic } = req.body;

      const createMessage = await Message.create({ name, message, topic });

      return res.status(201).json({ message: "Message has been successfully created", data: createMessage });
    } catch (e) {
      next(e);
    }
  });
app.delete("/v1/api/message/:id", async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const deleteMessage = await Message.findByIdAndDelete(reqId);

    if (!deleteMessage) throw new AppError("Message not found", 404);

    return res.status(200).json({ message: "Message has been successfully deleted", data: deleteMessage });
  } catch (e) {
    next(e);
  }
});

// middleware error
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((er) => er.message);

    return res.status(400).json({
      status: "fail",
      message: errors,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: "error",
    message: "An error occurred on the server",
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
