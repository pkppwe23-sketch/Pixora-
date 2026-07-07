const express = require("express");
const multer = require("multer");
const cors = require("cors");

const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.model");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

// Create Post
app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// Get All Posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// Delete Post
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = app;