import { useState } from "react";
import { createBlog } from "../api/blogs";
import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";

export default function CreateBlog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog(formData);
      navigate("/blogs");
    } catch (err) {
      alert("Failed to create blog");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-[600px] bg-white border border-border rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-bold text-textPrimary mb-6 text-center">
          Create a New Blog
        </h2>

        <BlogForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isEditing={false}
        />
      </div>
    </div>
  );
}