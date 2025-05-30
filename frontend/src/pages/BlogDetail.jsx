import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchBlog, deleteBlog } from "../api/blogs";
import { useAuth } from "../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog(id)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        navigate("/blogs");
      });
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      navigate("/blogs");
    } catch (err) {
      alert("Failed to delete blog");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  const isAuthor = user?.username === blog.author;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">{blog.title}</h1>

      <div className="text-sm text-gray-500 mb-6">
        By <span className="font-medium text-gray-700">{blog.author}</span> •{" "}
        {new Date(blog.created_at).toLocaleString()}
      </div>

      <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>

      {isAuthor && (
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to={`/blogs/${blog.id}/edit`}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
