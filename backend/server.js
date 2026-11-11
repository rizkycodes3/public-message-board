import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "mongoose";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

db.connect(process.env.URL_DB)
  .then(() => console.log("success running mongodb"))
  .catch((e) => console.error(e));

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
      required: [true, "The message topic must be filled in"],
    },
  },
  { timestamps: true },
);
const Message = db.model("Message", messageSchema);

// topic
app
  .route("/v1/api/topic")
  .get((req, res) => {
    Topic.find()
      .then((x) => res.status(200).json(x))
      .catch((e) => res.status(500).json({ error: e.message }));
  })
  .post((req, res) => {
    Topic.create({ name: req.body.name })
      .then((x) => res.status(201).json({ message: "The topic was successfully created", data: x }))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
app.delete("/v1/api/topic/:id", (req, res) => {
  Topic.findByIdAndDelete(req.params.id)
    .then((x) => res.status(200).json({ message: "The topic was successfully deleted", data: x }))
    .catch((e) => res.status(500).json({ error: e.message }));
});

// message
app
  .route("/v1/api/message")
  .get((req, res) => {
    Message.find()
      .populate("topic", "name")
      .then((x) => res.status(200).json(x))
      .catch((e) => res.status(500).json({ error: e.message }));
  })
  .post((req, res) => {
    Message.create({
      name: req.body.name,
      message: req.body.message,
      topic: req.body.idTopic,
    })
      .then((x) => res.status(201).json({ message: "Message has been successfully created", data: x }))
      .catch((e) => res.status(500).json({ error: e.message }));
  });
app.delete("/v1/api/:id", (req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then((x) => res.status(200).json({ message: "Message has been successfully deleted", data: x }))
    .catch((e) => res.status(404).json({ error: e.message }));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
