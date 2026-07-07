import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const res = await axios.post(
        "http://localhost:3000/create-post",
        formData
      );

      alert(res.data.message);

      e.target.reset();

      // Redirect to Home page after successful upload
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <section className="create-post-section">
      <h1>📸 Create New Post</h1>

      <p
        style={{
          textAlign: "center",
          color: "white",
          marginTop: "-5px",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        Share your favorite memories with everyone 🌍✨
      </p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label
          style={{
            color: "white",
            fontWeight: "600",
            marginBottom: "-10px",
          }}
        >
          Choose an Image
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          required
        />

        <label
          style={{
            color: "white",
            fontWeight: "600",
            marginBottom: "-10px",
          }}
        >
          Caption
        </label>

        <input
          type="text"
          name="caption"
          placeholder="Write something about your photo..."
          required
        />

        <button type="submit">
          🚀 Create Post
        </button>
      </form>

      <Link to="/">
        <button
          style={{
            marginTop: "18px",
            width: "100%",
            background: "#10b981",
          }}
        >
          🖼 View All Posts
        </button>
      </Link>
    </section>
  );
};

export default CreatePost;