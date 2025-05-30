import { useEffect, useState } from "react";
import { fetchBlog, updateBlog } from "../api/blogs";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await fetchBlog(id);
        setFormData({ title: res.data.title, content: res.data.content });
        setLoading(false);
      } catch (err) {
        alert("Error fetching blog");
        console.error(err);
        navigate("/blogs");
      }
    };

    loadBlog();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(id, formData);
      navigate(`/blogs/${id}`);
    } catch (err) {
      alert("Failed to update blog");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-600 text-lg">Loading blog data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl w-full mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-xl p-6 sm:p-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Blog</h1>
        <BlogForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isEditing={true}
        />
      </div>
    </div>
  );
}

