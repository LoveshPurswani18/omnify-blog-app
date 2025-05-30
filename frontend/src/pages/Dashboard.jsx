import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "https://omnify-backend-495525526179.asia-south1.run.app/api/other-blogs/";
const BASE_URL = "https://omnify-backend-495525526179.asia-south1.run.app";

export default function Dashboard() {
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
    if (url.startsWith("http")) return url; // already absolute
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

      console.log("Response data:", res.data);
    } catch (error) {
      console.error("Failed to load blogs:", error);
      setBlogs([]);
      setNextUrl(null);
      setPrevUrl(null);
      setCount(0);
      setCurrentPage(1);

      console.error("Fetch error:", error.response || error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(count / (blogs.length || 1));

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 pb-16">
      <h2 className="text-3xl font-bold text-textPrimary mb-6">All Blogs</h2>

      {loading && <p>Loading...</p>}

      {!loading && blogs.length === 0 && (
        <p className="text-textSecondary text-md">No blogs available.</p>
      )}

      {!loading && blogs.length > 0 && (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <div className="bg-white border border-border rounded-lg p-6 shadow-md transition-transform hover:scale-[1.01] hover:bg-gray-50 cursor-pointer">
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
  );
}