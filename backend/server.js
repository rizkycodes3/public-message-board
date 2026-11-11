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
  },
  { timestamps: true },
);
const message = db.model("Message", messageSchema);

app
  .route("/v1/api")
  .get((req, res) => {
    message
      .find()
      .then((x) => {
        res.json(x);
      })
      .catch((e) => res.status(500).json({ error: e.message }));
  })
  .post((req, res) => {
    message
      .create({
        name: req.body.name,
        message: req.body.message,
      })
      .then((x) => res.status(201).json({ message: "Data has been successfully created", data: x }))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

app.delete("/v1/api/:id", (req, res) => {
  message
    .findByIdAndDelete(req.params.id)
    .then((x) => res.status(201).json({ message: "Data has been successfully deleted", data: x }))
    .catch((e) => res.status(404).json({ error: e.message }));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
