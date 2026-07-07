import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts");

      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/posts/${id}`
      );

      alert(res.data.message);

      fetchPosts();

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <section className="home-section">

      <div className="home-header">

        <h1>
          🌿 Nature Gallery
        </h1>

        <p>
          Capture and share beautiful moments of life ✨
        </p>


        <Link to="/create">
          <button>
            ➕ Create New Post
          </button>
        </Link>

      </div>


      <div className="posts">

        {posts.length === 0 ? (

          <h2 className="empty">
            No posts yet. Create your first memory 🌄
          </h2>

        ) : (

          posts.map((post) => (

            <div 
              className="post-card" 
              key={post._id}
            >

              <img
                src={post.image}
                alt={post.caption}
              />


              <div className="post-content">

                <h3>
                  {post.caption}
                </h3>


                {
                  post.createdAt && (
                    <>
                      <p>
                        📅 
                        {new Date(post.createdAt)
                        .toLocaleDateString()}
                      </p>


                      <p>
                        🕒 
                        {new Date(post.createdAt)
                        .toLocaleTimeString()}
                      </p>
                    </>
                  )
                }


                <button
                  onClick={() => deletePost(post._id)}
                >
                  🗑 Delete Post
                </button>


              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default Home;