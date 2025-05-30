import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "https://omnify-backend-495525526179.asia-south1.run.app/api/my-blogs/";
const BASE_URL = "https://omnify-backend-495525526179.asia-south1.run.app";

export default function MyBlogList() {
  const [blogs, setBlogs] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getPageNumber = (url) => {
    if (!url) return null;
    try {
      const params = new URL(url).searchParams;
      return parseInt(params.get("page")) || 1;
    } catch {
      return null;
    }
  };

  const getFullUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return BASE_URL + url;
  };

  const fetchBlogs = async (url = API_BASE) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      const fullUrl = getFullUrl(url);
      const res = await axios.get(fullUrl, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.data.results) {
        setBlogs(res.data.results);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        setCount(res.data.count || 0);

        const currentPageFromUrl = getPageNumber(url) || 1;
        setCurrentPage(currentPageFromUrl);

      } else if (Array.isArray(res.data)) {
        setBlogs(res.data);
        setNextUrl(null);
        setPrevUrl(null);
        setCount(res.data.length);
        setCurrentPage(1);
      } else {
        setBlogs([]);
        setNextUrl(null);
        setPrevUrl(null);
        setCount(0);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Failed to load blogs:", error);
      setBlogs([]);
      setNextUrl(null);
      setPrevUrl(null);
      setCount(0);
      setCurrentPage(1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(count / (blogs.length || 1));

  return (
    <div className="min-h-screen px-4 py-10 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-textPrimary mb-6 text-center">
          My Blogs
        </h2>

        {loading && <p className="text-center">Loading...</p>}

        {!loading && blogs.length === 0 && (
          <p className="text-center text-gray-500">
            You haven't written any blogs yet.
          </p>
        )}

        {!loading && blogs.length > 0 && (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                <div className="bg-white border border-border p-6 rounded-xl shadow hover:bg-gray-50 transition">
                  <h3 className="text-xl font-semibold text-textPrimary mb-1">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-textSecondary">By {blog.author}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {count > 0 && (
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={() => fetchBlogs(prevUrl)}
              disabled={!prevUrl}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Previous
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => fetchBlogs(nextUrl)}
              disabled={!nextUrl}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}